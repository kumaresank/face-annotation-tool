var getAbsoluteOffset = function(el) {
    var x = 0,
        y = 0;
    do {
        x += el.offsetLeft;
        y += el.offsetTop;
    } while (el = el.offsetParent);
    return {
        x: x,
        y: y
    };
};

var createMark = function(x, y, point) {
    return $('<div id="point-' + point + '"><span class="pointer">' + point + '</span></div>')
        .css({
            position: 'absolute',
            left: x,
            top: y,
            width: '5px',
            height: '5px',
            'border-radius': '50%',
            border: '3px solid #75BA9E'
        });
};
var count = 0;
var skips = [];
$('img').click(function(e) {
    count++;
    if (count <= 8) {
        var offset, x, y, mark;
        e.preventDefault();
        offset = getAbsoluteOffset(this);
        x = e.pageX - offset.x;
        y = e.pageY - offset.y;
        mark = createMark(x, y, count);
        mark.appendTo(this.parentNode);
    }
});

document.body.addEventListener('keyup', function(e) {
    if (e.keyCode === 83) {
        if (count > 0 && count <= 7) {
            count++;
            skips.push(count);
            var skip = document.getElementsByClassName('skip-group');
            skip[0].innerHTML = 'Skipped : ' + skips.toString();
            skip[0].style.visibility = 'visible';
        }
    } else if (e.keyCode === 27 || e.keyCode === 8) {
        if (count > 0 && count <= 8) {
            if (skips.indexOf(count) == -1) {
                document.getElementById('point-' + count).remove();
            } else {
                skips.pop();
                var skip = document.getElementsByClassName('skip-group');
                skip[0].innerHTML = 'Skipped : ' + skips.toString();
                skip[0].style.visibility = 'visible';
            }
            count--;
        }
    } else if (e.keyCode === 13) {
        $('button.btn-next').click();
    }
});