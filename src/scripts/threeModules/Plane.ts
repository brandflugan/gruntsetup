import * as THREE from 'three';

export function Plane() {
    const geometry = new THREE.PlaneGeometry(32, 32);
    const material = new THREE.MeshBasicMaterial({color: 0x348060});

    return new THREE.Mesh(geometry, material);

    // function setTexture(): THREE.Texture {
    //     const texture = new THREE.TextureLoader().load('images/cobblestone.png');
    //     texture.wrapS = THREE.RepeatWrapping;
    //     texture.wrapT = THREE.RepeatWrapping;
    //     texture.repeat.set(4, 4);
    //     return texture;
    // }
}