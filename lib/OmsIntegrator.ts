
class OmsIntegrator {
    storeOrder = async (data: BodyInit): Promise<number|null> => {
        try {
            const response = await fetch(`${process.env.OMS_API_URL}/orders/store`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(data)
            })
            const res: any = await response.json()
            const id: number = res.data

            return id ?? null
        } catch (e) {
            console.log(e)
            return null
        }
    }
}

const omsIntegrator = new OmsIntegrator()

export default omsIntegrator