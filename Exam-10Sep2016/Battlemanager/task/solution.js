function solve() {
    'use strict';

    const ERROR_MESSAGES = {
        INVALID_NAME_TYPE: 'Name must be string!',
        INVALID_NAME_LENGTH: 'Name must be between between 2 and 20 symbols long!',
        INVALID_NAME_SYMBOLS: 'Name can contain only latin symbols and whitespaces!',
        INVALID_MANA: 'Mana must be a positive integer number!',
        INVALID_EFFECT: 'Effect must be a function with 1 parameter!',
        INVALID_DAMAGE: 'Damage must be a positive number that is at most 100!',
        INVALID_HEALTH: 'Health must be a positive number that is at most 200!',
        INVALID_SPEED: 'Speed must be a positive number that is at most 100!',
        INVALID_COUNT: 'Count must be a positive integer number!',
        INVALID_SPELL_OBJECT: 'Passed objects must be Spell-like objects!',
        NOT_ENOUGH_MANA: 'Not enough mana!',
        TARGET_NOT_FOUND: 'Target not found!',
        INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!'
    };

    // your implementation goes here

    const battlemanager = (function() {
        function* idGenerator() {
            let lastId = 0,
                forever = true;

            while (forever) {
                if (lastId > 200) {
                    break;
                }
                yield(lastId += 1);
            }
        }

        const validator = {
            isNameValid(name) {
                if (typeof name != "string") {
                    throw ERROR_MESSAGES.INVALID_NAME_TYPE;
                } else if (name < 2 || 20 < name) {
                    throw ERROR_MESSAGES.INVALID_NAME_LENGTH;
                } else if (!/^[a-zA-Z\s]*$/.test(name)) {
                    throw ERROR_MESSAGES.INVALID_NAME_SYMBOLS;
                } else {
                    return true;
                }
            },
            isValidMana(mana) {
                if (mana < 0) {
                    throw ERROR_MESSAGES.INVALID_MANA;
                } else {
                    return true;
                }
            }
        };

        class Spell {
            constructor(name, manaCost, effect) {
                this.name = name;
                this.manaCost = manaCost;
                this.effect = effect;
            }

            get name() {
                return this.name;
            }

            set name(value) {
                if (validator.isNameValid(value)) {
                    this._name = value;
                }
            }

            get manaCost() {
                return this._manaCost;
            }

            set manaCost(value) {
                if (validator.isValidMana(value)) {
                    this._manaCost = value;
                }
            }

            get effect() {
                return this._effect;
            }

            set effect(func) {
                if ((typeof func != "function") /*|| (func.arguments.length != 1)*/ ) {
                    throw ERROR_MESSAGES.INVALID_EFFECT;
                }
                this._effect = func;
            }
        }

        class Unit {
            constructor(name, alignment) {
                this.name = name;
                this.alignment = alignment;
            }

            get name() {
                return this._name;
            }

            set name(value) {
                if (validator.isNameValid(value)) {
                    this._name = value;
                }
            }

            get alignment() {
                return this._alignment;
            }

            set alignment(value) {
                if (value != "neutral" &&
                    value != "good" &&
                    value != "evil") {
                    throw "Alignment must be good, neutral or evil!";
                } else {
                    this._alignment = value;
                }
            }
        }

        let armyUnitIdGenerator = idGenerator();
        class ArmyUnit extends Unit {
            constructor(name, alignment, damage, health, speed, count) {
                super(name, alignment);
                this.damage = damage;
                this.health = health;
                this.speed = speed;
                this.count = count;

                this.id = armyUnitIdGenerator.next().value;
            }

            get damage() {
                return this._damage;
            }

            set damage(value) {
                if (value < 0 || 100 < value) {
                    throw INVALID_DAMAGE;
                } else {
                    this._damage = value;
                }
            }

            get health() {
                return this._health;
            }

            set health(value) {
                if (value < 0 || 200 < value) {
                    throw ERROR_MESSAGES.INVALID_HEALTH;
                } else {
                    this._health = value;
                }
            }

            get count() {
                return this.count;
            }

            set count(value) {
                if (value < 0) {
                    throw ERROR_MESSAGES.INVALID_COUNT;
                } else {
                    this._count = value;
                }
            }

            get speed() {
                return this._speed;
            }

            set speed(value) {
                if (value < 0 || 100 < value) {
                    throw ERROR_MESSAGES.INVALID_SPEED;
                } else {
                    this._speed = value;
                }
            }
        }

        class Commander extends Unit {
            constructor(name, alignment, mana) {
                super(name, alignment);
                this.mana = mana;
                this.army = [];
                this.spellbook = [];
            }

            get mana() {
                return this._mana;
            }

            set mana(value) {
                if (validator.isValidMana(value)) {
                    this._mana = value;
                }
            }

            get spellbook() {
                return this._spellbook;
            }

            set spellbook(value) {
                this._spellbook = value;
            }

            get army() {
                return this._army;
            }

            set army(value) {
                this._army = value;
            }

            addArmyUnit(armyUnit) {
                this.army.push(armyUnit);
            }

            addSpell(spell) {
                if (spell.constructor.name != "Spell") {
                    throw "Passed objects must be Spell-like objects!";
                } else {
                    this.spellbook.push(spell);
                }
            }
        }

        let _commanders = new Map();

        function getCommander(name, alignment, mana) {
            let commander = new Commander(name, alignment, mana);

            return commander;
        }

        function getArmyUnit(options) {
            let armyUnit = new ArmyUnit(options.name,
                options.alignment,
                options.damage,
                options.health,
                options.speed,
                options.count);

            return armyUnit;
        }

        function getSpell(name, manaCost, effect) {
            let spell = new Spell(name, manaCost, effect);

            return spell;
        }

        function addCommanders(...commanders) {
            commanders.forEach(function(commander) {
                if (commander.constructor.name === "Commander") {
                    _commanders.set(commander.name, commander);
                }
            }, this);
            return this;
        }

        function addArmyUnitTo(commanderName, armyUnit) {
            _commanders.get(commanderName).addArmyUnit(armyUnit);
            return this;
        }

        function addSpellsTo(commanderName, ...spells) {
            spells.forEach(function(spell) {
                _commanders.get(commanderName).addSpell(spell);
            }, this);
            return this;
        }

        function findCommanders(query) {
            // TODO: implement;
        }

        function findArmyUnitById(id) {
            // TODO: implement;
        }

        function findArmyUnits(query) {
            // TODO: implement;
        }

        function spellcast(casterName, spellName, targetUnitId) {
            // TODO: implement
            return this;
        }

        function battle(attacker, defender) {
            // TODO: implement;
            return this;
        }


        return {
            getCommander,
            getArmyUnit,
            getSpell,
            addCommanders,
            addArmyUnitTo,
            addSpellsTo,
            findCommanders,
            findArmyUnitById,
            findArmyUnits,
            spellcast,
            battle
        };
    })();

    return battlemanager;

}

module.exports = solve;