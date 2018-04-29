import * as THREE from 'three';
import {SodaCan} from './SodaCan';
import {Plane} from './Plane';
// @ts-ignore
// import * as THREE from '/scripts/external/three';

export class SodaCanController {
    wrapper = document.getElementById('wrapper');
    scene: THREE.Scene;
    sodaCans = [];
    plane;
    camera;
    rotSpeed: number = 0.06;

    constructor() {
        /** Camera settings **/
        const _FOV: number = 60;
        const _ASPECT: number = window.innerWidth / window.innerHeight;
        const _NEAR: number = 0.1;
        const _FAR: number = 1000;

        this.camera = new THREE.PerspectiveCamera(_FOV, _ASPECT, _NEAR, _FAR);
        this.camera.position.x = 0;
        this.camera.position.y = 10;
        this.camera.position.z = 15;

        /** Scene setup **/
        this.scene = new THREE.Scene();
        this.camera.lookAt(this.scene.position);

        /** Renderer setup **/
        let renderer = new THREE.WebGLRenderer();
        this.wrapper.appendChild(renderer.domElement);

        /** Add plane to scene **/
        this.plane = Plane();
        this.plane.rotation.x = this.convertRadianToDegree(-90);
        this.scene.add(this.plane);

        /** Add elements to array **/
        this.sodaCans.push(SodaCan());

        /** Add elements to scene **/
        this.sodaCans.map(sodaCan => {
            return this.scene.add(sodaCan);
        });

        /** Add eventlistener **/
        document.addEventListener('keydown', this.onKeyDown, false);

        /** Animate **/
        let animate = () => {
            this.animationCallback(animate, renderer, this.camera);
            renderer.render(this.scene, this.camera);
        };
        this.resizeCanvasToDisplaySize(renderer, this.camera);
        animate();
    }

    private convertRadianToDegree(radianVal) {
        return radianVal * ((Math.PI * 2) / 360);
    }

    private animationCallback(animate, renderer, camera) {
        requestAnimationFrame(animate);
        // this.sodaCans[0].rotation.x += 0.002;
        // this.sodaCans[0].rotation.y += 0.002;
        // camera.lookAt(this.sodaCans[0].position);
        // this.camera.lookAt(this.plane.position);

        this.resizeCanvasToDisplaySize(renderer, camera, true);
    }


    private onKeyDown = (event) => {
        this.checkRotation(event.key);
        switch(event.key) {
            case 'w': // in
                if (this.camera.position.z > 5) {
                    this.camera.position.z -= 0.5;
                }
                break;
            case 's': // out
                if (this.camera.position.z < 35) {
                    this.camera.position.z += 0.5;
                }
                break;
        }
    };

    private resizeCanvasToDisplaySize(renderer, camera, force?) {
        const canvas = renderer.domElement;
        // look up the size the canvas is being displayed
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        // adjust displayBuffer size to match
        if (force || canvas.width !== width || canvas.height !== height) {
            // you must pass false here or three.js sadly fights the browser
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            // update any render target sizes here
        }
    }

    private checkRotation(key){
        let x = this.camera.position.x;
        let y = this.camera.position.y;
        let z = this.camera.position.z;

        if (key === 'a') {
            this.camera.position.x = x * Math.cos(this.rotSpeed) + z * Math.sin(this.rotSpeed);
            this.camera.position.z = z * Math.cos(this.rotSpeed) - x * Math.sin(this.rotSpeed);
        } else if (key === 'd') {
            this.camera.position.x = x * Math.cos(this.rotSpeed) - z * Math.sin(this.rotSpeed);
            this.camera.position.z = z * Math.cos(this.rotSpeed) + x * Math.sin(this.rotSpeed);
        }

        this.camera.lookAt(this.scene.position);

    }
}