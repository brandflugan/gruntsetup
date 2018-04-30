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
    light;
    sodaCanSize = 8;

    constructor() {
        /** Camera settings **/
        const _FOV: number = 70;
        const _ASPECT: number = window.innerWidth / window.innerHeight;
        const _NEAR: number = 1;
        const _FAR: number = 10000;

        this.camera = new THREE.PerspectiveCamera(_FOV, _ASPECT, _NEAR, _FAR);
        this.camera.position.set(0, 100, 150);

        /** Scene setup **/
        this.scene = new THREE.Scene();
        this.camera.lookAt(this.scene.position);

        /** Light setup **/
        this.scene.add(new THREE.AmbientLight(0xf0f0f0 ));
        this.light = new THREE.SpotLight(0xffffff, 1, 0.0, Math.PI/3, 0.0, 2);
        this.light.position.set(0, 1000, 1000);
        this.light.castShadow = true;
        // @ts-ignore
        this.light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(70, 1, 200, 2000));
        this.light.shadow.bias = -0.000222;
        this.light.shadow.mapSize.width = 2048;
        this.light.shadow.mapSize.height = 2048;
        this.scene.add(this.light);

        let spotLightHelper = new THREE.SpotLightHelper( this.light );
        this.scene.add(spotLightHelper);

        /** Helper **/
        this.helper = new THREE.GridHelper( 2000, 100 );
        this.helper.position.y = - 0;
        this.helper.material.opacity = 0.25;
        this.helper.material.transparent = true;
        this.scene.add(this.helper);

        /** Renderer setup **/
        let renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0xf0f0f0);
        renderer.shadowMap.enabled = true;
        this.wrapper.appendChild(renderer.domElement);

        /** Control setup **/
        const controls = new OrbitControls(this.camera, renderer.domElement);

        // How far you can orbit vertically, upper and lower limits.
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = ConvertRadToDeg(180);

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
        this.sodaCans.push(SodaCan(this.sodaCanSize));

        /** Add elements to scene **/
        this.sodaCans.map(sodaCan => {
            // this.calculateSize(sodaCan);
            if(this.sodaCans.indexOf(sodaCan) == 1) {
                sodaCan.position.y += this.calculateSize(sodaCan).y;
            }
            sodaCan.castShadow = true;
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

    private calculateSize(sodaCan: THREE.Mesh) {
        sodaCan.geometry.computeBoundingBox();
        return sodaCan.geometry.boundingBox.getSize(new THREE.Vector3());
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