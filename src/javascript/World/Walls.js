import * as THREE from 'three'

export default class Walls
{
    constructor(_options)
    {
        // Options
        this.resources = _options.resources
        this.objects = _options.objects
    }

    add(_options)
    {
        const items = []
        const shape = _options.shape

        let widthCount = shape.widthCount
        const heightCount = shape.widthCount

        switch(_options.shape.type)
        {
            case 'rectangle':
            case 'brick':
                for(let i = 0; i < heightCount; i++)
                {
                    for(let j = 0; j < widthCount; j++)
                    {
                        const offset = new THREE.Vector3()
                        offset.add(shape.offsetWidth.clone().multiplyScalar(j - (shape.widthCount - 1) * 0.5))
                        offset.add(shape.offsetHeight.clone().multiplyScalar(i))
                        offset.x += (Math.random() - 0.5) * shape.randomOffset.x
                        offset.y += (Math.random() - 0.5) * shape.randomOffset.y
                        offset.z += (Math.random() - 0.5) * shape.randomOffset.z

                        if(_options.shape.type === 'brick' && i % 2 === 0)
                        {
                            offset.add(shape.offsetWidth.clone().multiplyScalar(0.5))
                        }

                        const rotation = new THREE.Euler()
                        rotation.x += (Math.random() - 0.5) * shape.randomRotation.x
                        rotation.y += (Math.random() - 0.5) * shape.randomRotation.y
                        rotation.z += (Math.random() - 0.5) * shape.randomRotation.z

                        items.push({
                            offset,
                            rotation
                        })
                    }
                }

                break

            case 'triangle':
                for(let i = 0; i < heightCount; i++)
                {
                    for(let j = 0; j < widthCount; j++)
                    {
                        const offset = new THREE.Vector3()
                        offset.add(shape.offsetWidth.clone().multiplyScalar(j - (shape.widthCount - 1) * 0.5))
                        offset.add(shape.offsetWidth.clone().multiplyScalar(i * 0.5))
                        offset.add(shape.offsetHeight.clone().multiplyScalar(i))
                        offset.x += (Math.random() - 0.5) * shape.randomOffset.x
                        offset.y += (Math.random() - 0.5) * shape.randomOffset.y
                        offset.z += (Math.random() - 0.5) * shape.randomOffset.z

                        if(_options.shape.type === 'brick' && i % 2 === 0)
                        {
                            offset.add(shape.offsetWidth.clone().multiplyScalar(0.5))
                        }

                        const rotation = new THREE.Euler()
                        rotation.x += (Math.random() - 0.5) * shape.randomRotation.x
                        rotation.y += (Math.random() - 0.5) * shape.randomRotation.y
                        rotation.z += (Math.random() - 0.5) * shape.randomRotation.z


                        items.push({
                            offset,
                            rotation
                        })
                    }

                    widthCount--
                }

                break
        }

        for(const _item of items)
        {
            const objectOptions = { ..._options.object }
            objectOptions.offset = _options.object.offset.clone().add(_item.offset).add(shape.position)
            objectOptions.rotation = _options.object.rotation.clone()
            objectOptions.rotation.x += _item.rotation.x
            objectOptions.rotation.y += _item.rotation.y
            objectOptions.rotation.z += _item.rotation.z
            this.objects.add(objectOptions)
        }
    }
}