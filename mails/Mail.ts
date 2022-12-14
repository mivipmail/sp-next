class Mail {
    data: any
    file: File|null

    constructor(data: any, file: File|null = null) {
        this.data = data
        this.file = file
    }

    getSubject = () => {
        return 'Subject'
    }

    getText = () => {
        return 'Text'
    }

    getHtml = () => {
        return 'Html'
    }

    getFile = () => {
        return this.file
    }
}

export default Mail