import confetti1 from '../../dist/images/confetti/conf1.png';
import confetti2 from '../../dist/images/confetti/conf2.png';
import confetti3 from '../../dist/images/confetti/conf3.png';
import confetti4 from '../../dist/images/confetti/conf4.png';

export default {
    "lifetime": {
        "min": 4,
        "max": 4
    },
    "ease": [
        {
            "s": 0,
            "cp": 0.379,
            "e": 0.548
        },
        {
            "s": 0.548,
            "cp": 0.717,
            "e": 0.676
        },
        {
            "s": 0.676,
            "cp": 0.635,
            "e": 1
        }
    ],
    "frequency": 0.004,
    "emitterLifetime": 0,
    "maxParticles": 1000,
    "addAtBack": false,
    "pos": {
        "x": 0,
        "y": 0
    },
    "behaviors": [
        {
            "type": "alpha",
            "config": {
                "alpha": {
                    "list": [
                        {
                            "time": 0,
                            "value": 0.73
                        },
                        {
                            "time": 1,
                            "value": 0.46
                        }
                    ]
                }
            }
        },
        {
            "type": "moveSpeedStatic",
            "config": {
                "min": 700,
                "max": 1200
            }
        },
        {
            "type": "scale",
            "config": {
                "scale": {
                    "list": [
                        {
                            "time": 0,
                            "value": 0.5
                        },
                        {
                            "time": 1,
                            "value": 1
                        }
                    ]
                },
                "minMult": 0.5
            }
        },
        {
            "type": "rotation",
            "config": {
                "accel": 0,
                "minSpeed": 100,
                "maxSpeed": 200,
                "minStart": 90,
                "maxStart": 110
            }
        },
        {
            "type": "textureRandom",
            "config": {
                "textures": [
                    confetti1,
                    confetti2,
                    confetti3,
                    confetti4
                ]
            }
        },
        {
            "type": "spawnShape",
            "config": {
                "type": "rect",
                "data": {
                    "x": -500,
                    "y": -800,
                    "w": 1200,
                    "h": 20
                }
            }
        }
    ]
}