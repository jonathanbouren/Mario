const blocks = [
  [1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0],
  [1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 2, 0, 0, 0, 0]
];

let x = 0;
let y = 0;

function render(blockArray) {
  let markup = '';
  blockArray.forEach((row) => {
      markup += '<div class = "row">';
      Array.from(row).forEach((item) => {
          if (item === 0) {
              markup += '<div class = "item"></div>';
          } else if (item === 1) {
              markup += '<div class = "mushrooms"></div>';
          } else if (item === 2) {
            x = rowSide;
            y = columnSide;
              markup += '<div class = "Mario"></div >';
          }
      });
      markup += '</div>';
  });
document.getElementById('app').innerHTML = markup;

};
render(blocks);

document.addEventListener('keyup', (event) => {
if(event.key ==== 'ArrowRight') {
blocks[rowSide][columnSide] = 0;
blocks[rowSide][columnSide + 1] = 2;
render(blocks);
}
});

