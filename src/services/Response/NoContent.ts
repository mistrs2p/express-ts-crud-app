import ResponseHandler from ".";

export default class Created extends ResponseHandler {
    constructor(data: any) {
        super(204, data)
    }
}
