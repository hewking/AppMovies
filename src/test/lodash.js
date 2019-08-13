import debounce from 'lodash/debounce';

const test = () => {
    debounce(() => {
        console.log('debounce test');
    }, 500);
}

test();