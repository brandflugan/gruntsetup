import * as THREE from 'three';
import { OrbitControls } from '../utils/OrbitControls';
import {SodaCan} from './SodaCan';
import {Plane} from './Plane';
import {ConvertRadToDeg} from "../utils/ConvertRadToDeg";
// @ts-ignore
// import * as THREE from '/scripts/external/three';

export class SodaCanController {
    wrapper = document.getElementById('wrapper');
    scene: THREE.Scene;
    sodaCans = [];
    plane;
    helper;
    camera;
    sodaCanSize = 8;

    constructor() {
        /** Camera settings **/
        const _FOV: number = 70;
        const _ASPECT: number = window.innerWidth / window.innerHeight;
        const _NEAR: number = 1;
        const _FAR: number = 10000;

        this.camera = new THREE.PerspectiveCamera(_FOV, _ASPECT, _NEAR, _FAR);
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 1000;

        /** Scene setup **/
        this.scene = new THREE.Scene();
        this.camera.lookAt(this.scene.position);

        /** Light setup **/
        this.scene.add(new THREE.AmbientLight(0xf0f0f0 ));
        let light = new THREE.SpotLight( 0xffffff, 1.5);
        light.position.set(0, 1500, 200);
        light.castShadow = true;
        // @ts-ignore
        light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(70, 1, 200, 2000));
        light.shadow.bias = -0.000222;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        this.scene.add(light);

        /** Helper **/
        this.helper = new THREE.GridHelper( 2000, 100 );
        this.helper.position.y = - 201;
        this.helper.material.opacity = 0.25;
        this.helper.material.transparent = true;
        this.scene.add(this.helper);

        /** Renderer setup **/
        let renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setClearColor(0xf0f0f0);
        // renderer.setPixelRatio( window.devicePixelRatio );
        // renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        this.wrapper.appendChild(renderer.domElement);

        /** Control setup **/
        const controls = new OrbitControls(this.camera, renderer.domElement);

        // How far you can orbit vertically, upper and lower limits.
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI;

        // How far you can dolly in and out ( PerspectiveCamera only )
        controls.minDistance = 0;
        controls.maxDistance = Infinity;

        controls.enableZoom = true; // Set to false to disable zooming
        controls.zoomSpeed = 1.0;

        controls.enablePan = true; // Set to false to disable panning (ie vertical and horizontal translations)

        /** Add plane to scene **/
        this.plane = Plane();
        this.plane.rotation.x = ConvertRadToDeg(-90);
        this.scene.add(this.plane);

        /** Add elements to array **/
        this.sodaCans.push(SodaCan(this.sodaCanSize));

        /** Add elements to scene **/
        this.sodaCans.map(sodaCan => {
            sodaCan.castShadow = true;
            console.log(sodaCan.geometry.parameters.height);
            sodaCan.position.y = this.helper.position.y + (sodaCan.geometry.parameters.height / 2);
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

    private animationCallback(animate, renderer, camera) {
        requestAnimationFrame(animate);

        this.resizeCanvasToDisplaySize(renderer, camera, true);
    }

    private onKeyDown = (event) => {
        switch(event.key) {
            case 'a': // in
                this.addSodaCan();
                break;
            case 'r': // out
                this.removeSodaCan();
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
        }
    }

    private addSodaCan(){

    }

    private removeSodaCan(){

    }
}