import * as THREE from 'three';

export function SodaCan() {
    const geometry = new THREE.CylinderGeometry(1.5, 1.5, 10, 32);
    const material = new THREE.MeshBasicMaterial({map: setTexture(), });

    return new THREE.Mesh(geometry, material);

    function setTexture(): THREE.Texture {
        const texture = new THREE.TextureLoader().load('images/coca-cola-texture.jpg');
        // texture.wrapS = THREE.RepeatWrapping;
        // texture.wrapT = THREE.RepeatWrapping;
        // texture.repeat.set(1, 1);
        return texture;
    }
}