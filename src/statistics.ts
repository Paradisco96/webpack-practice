import $ from 'jquery';

function createStatistics(): {destroy: () => string; getClicks: () => number | string } {
let counter = 0;
let isDestroyed : boolean = false;
const listener = (): number => counter + 1;

$(document).on('click', listener);

return {
destroy() {
$(document).off('click', listener);
isDestroyed = true;
return 'Statistics fully destroyed';
},

getClicks() {
if (isDestroyed) return 'Statistics is destroyed';
return counter;
}
}
}
window['statistics'] = createStatistics();