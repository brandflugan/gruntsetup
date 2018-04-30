import * as THREE from 'three';

export function SodaCan(size: number) {
    const geometry = new THREE.CylinderGeometry(size * 4, size * 4, size * 12, 32);
    const material = new THREE.MeshBasicMaterial({map: setTexture()});
    return new THREE.Mesh(geometry, material);

    function setTexture(): THREE.Texture {
        const texture = new THREE.TextureLoader().load('images/coca-cola-texture.jpg');
        // texture.minFilter = THREE.LinearFilter;
        // texture.wrapS = THREE.RepeatWrapping;
        // texture.wrapT = THREE.RepeatWrapping;
        // texture.repeat.set(1, 1);
        return texture;
    }
}