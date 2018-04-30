import * as THREE from 'three';

export function SodaCan(size: number) {
    const logoMaterial = new THREE.MeshLambertMaterial({map: setTexture(), envMap: setEnvMap(), overdraw: 155.5});

    const latheGeometry = new THREE.LatheBufferGeometry(drawLathePath().getPoints(), 64);
    latheGeometry.scale(size, size, size);

    // const foilMaterial = new THREE.MeshLambertMaterial({color: 'silver'});
    // const geometry = new THREE.CylinderGeometry(size * 4, size * 4, size * 12, 64);
    // return new THREE.Mesh(geometry, [logoMaterial, foilMaterial, foilMaterial]);

    return new THREE.Mesh(latheGeometry, [logoMaterial]);

    function setTexture(): THREE.Texture {
        const texture = new THREE.TextureLoader().load('images/coca-cola-texture.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        return texture;
    }

    function setEnvMap(): THREE.Texture {
        const envMap = new THREE.TextureLoader().load( 'images/metal5.jpg');
        envMap.mapping = THREE.SphericalReflectionMapping;
        return envMap;
    }

    function drawLathePath(): THREE.Path {
        let lathe = new THREE.Path();
        lathe.lineTo(0, 0);
        lathe.absarc(1, 0, 0.125, Math.PI, Math.PI * 2, true);
        lathe.lineTo(1.5, 0.5);
        lathe.lineTo(1.5, 4.5);
        lathe.absarc(1, 5, 0.125, 0, Math.PI, true);
        lathe.lineTo(0, 5);
        return lathe;
    }
}