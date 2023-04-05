/**
 * Thrown when some entity does not exist.
 */
class EntityDoesNotExist extends Error {
    constructor(message: string) {
        super(message);
    }
}

export default EntityDoesNotExist;