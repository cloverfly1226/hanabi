import { Group } from "three";
import Shoo from "./Shoo";
import Boom from "./Boom";

export default class Hanabi extends Group {
    constructor() {
        super();

        this.add((this.shoo = new Shoo()));
        this.add((this.boom = new Boom()));
    }

    private shoo: Shoo;
    private boom: Boom;

    update(delta: number) {
        this.shoo.update(delta);
        this.boom.update(delta);
    }
}
