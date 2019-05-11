$(function () {
  'use strict';
  const settings = {
    rangeRandNumber: {
      min: 0,
      max: 100
    },
    messages: {
      more: 'Больше',
      less: 'Меньше',
      guessed: 'Число угадано',
      insertTheNumber: 'Введите число в диапазоне:',
      numberShouldBe: 'Число должно быть в диапазоне:',
      playedGame: 'Играем...',
      startGame: 'Начать игру'
    },
    elemIds: {
      startBtn: 'start',
      input: 'number',
      confirmBtn: 'confirm',
      resultOut: 'result'
    },
    elemClasses: {
      error: 'error',
      success: 'success',
    },
    elemStartDisabled: ['input', 'confirmBtn'],
    debug: false
  };

  const helper = {
    randomInteger(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    }
  };

  const game = {
    settings,
    helper,
    isStart: false,
    randNumber: null,
    input: null,
    startBtn: null,
    confirmBtn: null,
    resultOut: null,

    init(settings = {}) {
      Object.assign(this.settings, settings);
      this.setHandlers();
      this.elementDisabled(this.settings.elemStartDisabled)
    },

    start() {
      this.clear();
      this.setRandNumber();
      this.isStart = true;
      this.setResultMessage(
        this.settings.messages.insertTheNumber
        + this.getNumbersRange()
      );
      this.getElement('startBtn')
        .text(this.settings.messages.playedGame)
        .prop('disabled', true);
      this.elementDisabled(this.settings.elemStartDisabled, false)
    },

    checkNumber() {
      if (!this.isStart) return;
      let val = Number.parseInt(this.getElement('input').val());
      this.clear();
      let validate = this.validateNumber(val);
      if (!validate.status) {
        this.setError(validate.message);
        return
      }
      if (val < this.randNumber) {
        this.setResultMessage(this.settings.messages.more)
      } else if (val > this.randNumber) {
        this.setResultMessage(this.settings.messages.less)
      } else {
        this.success()
      }
    },

    validateNumber(num) {
      const result = {
        status: false,
        message: this.settings.messages.numberShouldBe + this.getNumbersRange()
      };
      if (!Number.isInteger(num)) {
      } else if (num < this.settings.rangeRandNumber.min
        || num > this.settings.rangeRandNumber.max
      ) {
      } else {
        result.status = true;
        result.message = ''
      }

      return result
    },

    setResultMessage(msg) {
      this.getElement('resultOut').text(msg)
    },

    setRandNumber() {
      this.randNumber = this.helper.randomInteger(
        this.settings.rangeRandNumber.min,
        this.settings.rangeRandNumber.max
      );
      this.debug(`Random number: ${this.randNumber}`);
    },

    setHandlers() {
      for (const [key, className] of Object.entries(this.settings.elemIds)) {
        this.addHandler(key)
      }
    },

    addHandler(name) {
      switch (name) {
        case 'startBtn':
          this.getElement(name)
            .click(() => this.start());
          break;
        case 'confirmBtn':
          this.getElement(name)
            .click(() => this.checkNumber());
          break;
        case 'input':
          this.getElement(name)
            .keypress((event) => {
              if (event.which === 13) {
                this.checkNumber()
              }
            })
      }
    },

    getIdSelector(elem) {
      return '#' + this.settings.elemIds[elem]
    },

    getElement(name) {
      if (!this[name]) {
        this[name] = $(this.getIdSelector(name))
      }
      return this[name]
    },

    getNumbersRange() {
      return ' '
        + this.settings.rangeRandNumber.min
        + '-'
        + this.settings.rangeRandNumber.max
    },

    setError(msg = '') {
      this.getElement('resultOut').addClass(this.settings.elemClasses.error);
      if (msg) {
        this.getElement('resultOut').text(msg)
      }
    },

    success() {
      this.setResultMessage(this.settings.messages.guessed);
      this.getElement('resultOut').addClass(this.settings.elemClasses.success);
      this.isStart = false;
      this.getElement('startBtn')
        .text(this.settings.messages.startGame)
        .prop('disabled', false);
      this.elementDisabled(this.settings.elemStartDisabled)
    },

    clear() {
      for (const [key, className] of Object.entries(this.settings.elemClasses)) {
        this.getElement('resultOut').removeClass(className);
      }
      this.getElement('input').val('')
    },

    elementDisabled(param, disabled = true) {
      if (typeof param === 'string') {
        this.getElement(param).prop('disabled', disabled)
      } else if (Array.isArray(param)) {
        for (const el of param) {
          this.getElement(el).prop('disabled', disabled)
        }
      }
    },

    debug(msg) {
      if (this.settings.debug) {
        console.log(msg)
      }
    }
  };

  game.init({debug: true});
});
