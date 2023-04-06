document.querySelector(".control-buttons span").onclick = function () {

    let yourName = prompt("Whats Your Name?");

    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = 'Unknown';

    } else {
        document.querySelector(".name span").innerHTML = yourName;

    }

    document.querySelector('.control-buttons').remove();
};


let duration = 1000;

let blocksContainer = document.querySelector('.memory-game-blocks');

let blocks = Array.from(blocksContainer.children);

//let orderrange = [...Array(blocks.length).keys()];

// another way
let orderrange = Array.from(Array(blocks.length).keys());

shuffle(orderrange);

blocks.forEach((block, index) => {

    // Add CSS Order Property
    block.style.order = orderrange[index];

    // Add Click Event
    block.addEventListener('click', function () {

        // Trigger The Flip Block Function
        flipBlock(block);

    });

});


function flipBlock(selectedBlock) {

    // Add Class is-flipped
    selectedBlock.classList.add('is-flipped');

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if (allFlippedBlocks.length === 2) {
        stopClicking();

        checkmatch(allFlippedBlocks[0], allFlippedBlocks[1]);

    }
}


function stopClicking() {
    blocksContainer.classList.add('noClicking');

    setTimeout(() => {
        blocksContainer.classList.remove('noClicking');
    }, duration);
}


function checkmatch(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();
    }

    else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
        document.getElementById('fail').play();

    }
}


function shuffle(array) {
    let current = array.length,
        temp,
        random;

    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;

        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;

}



