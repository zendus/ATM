class Condition_checker {
    constructor(check) {
        this.check = check || true
    }

    disableOrEnable(isDisabled) {
        return this.check = isDisabled;
    };

}

const tes = new Condition_checker()

module.exports = tes