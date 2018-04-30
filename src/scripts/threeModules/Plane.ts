import * as THREE from 'three';

export function Plane(): THREE.Mesh {
    const geometry = new THREE.PlaneGeometry(2000, 2000);
    // geometry.rotateX( - Math.PI / 2 );
    const material = new THREE.ShadowMaterial();
    material.opacity = 0.4;

    const plane = new THREE.Mesh(geometry, material);
    plane.position.y = -202;
    plane.receiveShadow = true;
    return plane;

    // function setTexture(): THREE.Texture {
    //     const texture = new THREE.TextureLoader().load('images/cobblestone.png');
    //     texture.wrapS = THREE.RepeatWrapping;
    //     texture.wrapT = THREE.RepeatWrapping;
    //     texture.repeat.set(4, 4);
    //     return texture;
    // }
}