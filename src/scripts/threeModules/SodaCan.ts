import * as THREE from 'three';

export function SodaCan(size: number) {
    const logoMaterial = new THREE.MeshLambertMaterial({map: setTexture(), envMap: setEnvMap()});
    const latheGeometry = new THREE.LatheBufferGeometry(drawLathePath().getPoints(), 64);

    const getUV = latheGeometry.getAttribute('uv');
    const getPosition = latheGeometry.getAttribute('position');

    for(let i = 0; i < getPosition.count; i++){
        getUV.setY(i, getPosition.getY(i) > 1 ? 0.775 : 0.23);
    }
    latheGeometry.scale(size, size, size);

    return new THREE.Mesh(latheGeometry, [logoMaterial]);

    function setTexture(): THREE.Texture {
        return new THREE.TextureLoader().load('images/coca-cola-texture.png');
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
        lathe.lineTo(1.5, 4.4);
        lathe.lineTo(1.1, 4.8);
        lathe.lineTo(1.1, 4.9);
        lathe.lineTo(1.14, 4.9);
        lathe.lineTo(1.14, 5);
        lathe.lineTo(1.1, 5);
        lathe.lineTo(1, 4.9);
        lathe.lineTo(1, 4.8);
        lathe.absarc(1, 4.75, 0.125, 0, Math.PI, true);
        lathe.lineTo(0, 4.75);
        return lathe;
    }
}