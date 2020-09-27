const menu = document.querySelector('#menu');
const button = document.querySelector('#button');

const menuController = {
    currentState: 'hide',
    initEvent() {
        console.log(21);
        button.onclick = this.transition.bind(this);
    },
    transition() {
        switch (this.currentState) {
            case 'show':
                this.currentState = 'hide';
                menu.classList.add('hide');
                menu.classList.remove('show');
                break;
            case 'hide':
                this.currentState = 'show';
                menu.classList.add('show');
                menu.classList.remove('hide');
                break;
        }
    }
}

menuController.initEvent();