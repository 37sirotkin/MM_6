export default {
    "lifetime": {
        "min": 4,
        "max": 4
    },
    "ease": [
        {
            "s": 0,
            "cp": 0.379,
            "e": -0.548
        },
        {
            "s": 0.548,
            "cp": 0.717,
            "e": -0.676
        },
        {
            "s": 0.676,
            "cp": 0.635,
            "e": .3
        }
    ],
    "frequency": 0.002,
    "emitterLifetime": 0,
    "maxParticles": 100,
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
                            "value": 0.43
                        },
                        {
                            "time": 1,
                            "value": 0.7
                        }
                    ]
                }
            }
        },
        {
            "type": "moveSpeedStatic",
            "config": {
                "min": 200,
                "max": 300
            }
        },
        {
            "type": "scale",
            "config": {
                "scale": {
                    "list": [
                        {
                            "time": 0,
                            "value": 0.15
                        },
                        {
                            "time": 1,
                            "value": 0.2
                        }
                    ]
                },
                "minMult": 0.2
            }
        },
        {
            "type": "rotation",
            "config": {
                "accel": 10,
                "minSpeed": 0,
                "maxSpeed": 100,
                "minStart": 50,
                "maxStart": 70
            }
        },
        {
            "type": "textureRandom",
            "config": {
                "textures": [
                    //image
                ]
            }
        },
        {
            "type": "spawnShape",
            "config": {
                "type": "rect",
                "data": {
                    "x": -50,
                    "y": 0,
                    "w": window.innerWidth * 4,
                    "h": window.innerHeight * 4
                }
            }
        }
    ]
}