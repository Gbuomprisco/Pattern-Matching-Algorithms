/*
 **  Naive Search
 */

function NaiveSearch(x, y, n, m) {
    var i = 0;
    while (i <= n - m) {
        var j = 0;
        while ((j < m) && (y[j] == x[i + j])) {
            j++;
        }
        if (j == m) {
            console.log('y occurs in x at the position ' + i);
        }
        i++;
    }
}

function Hash(x, m, base, q) {
    var i = 0,
        j = 1;
    for (; i < m; i++) {
        j += (x.charCodeAt(i) * Math.pow(base, m - i));
    }
    return j % q;
}

function KarpRabin(x, y, m, n, d, q) {
    var i = 0,
        hx, hy, j, substr;

    hx = Hash(x, n, d, q);
    hy = Hash(y, n, d, q);

    while (i <= m - n) {
        if (hx == hy) {
            j = 0;
            while (j < n && y[j] == x[i + j]) {
                j++;
            }
            if (j == n) {
                console.log('y occurs in x at the position ' + i);
            }
        }
        substr = x.substr(i + 1, n);
        hx = Hash(substr, substr.length, d, q);
        i++;
    }
}


/*
 ** Compute borders of a string
 */

function Borders(x, m) {
    var i, j = 1;
    var border = [];
    while (j < m) {
        border.push(i);
        while (i >= 0 && x[j] !== x[i]) {
            if (!i) {
                i--;
            } else {
                i = border[i - 1];
            }
        }
        i++;
        j++;
    }
    border.push(i);
    return border;
}

/*
 ** Preprocessing Morris-Pratt Algorithm
 */

function MP_Next(x, m) {
    var j = -1,
        i = 0;
    var mpNext = [j];
    while (i < m - 1) {
        while (j >= 0 && x[i] !== x[j]) {
            j = mpNext[j];
        }
        j++;
        i++;
        mpNext.push(j);
    }
    mpNext.push(j);
    return mpNext;
}

/*
 ** Preprocessing Knuth-Morris-Pratt Algorithm
 */

function KMP_Next(x, m) {
    var j = -1,
        i = 0;
    var kmpNext = [j];
    while (i < m - 1) {
        while (j >= 0 && x[i] !== x[j]) {
            j = kmpNext[j];
        }
        j++;
        i++;
        if (x[i] == x[j]) {
            kmpNext.push(kmpNext[j]);
        } else {
            kmpNext.push(j);
        }
    }
    return kmpNext;
}

/*
 ** KMP and MP Algorithms Search function
 */


function Search(x, y, m, n, algorithm) {

    var borders;

    if (algorithm == 'kmp') {
        borders = KMP_Next(x, m);
    } else if (algorithm == 'mp') {
        borders = MP_Next(x, m);
    }

    var i = 0,
        j = 0;

    while (j < m) {
        while (i == n || (i >= 0 && x[j] != y[i])) {
            i = borders[i];
        }

        i++;
        j++;

        if (i == n) {
            console.log("x occurs in y at the position " + (j - 1));
        }
    }
}

var x = "sddjrejmdifsdfdsfdsfdsfdfgdihjeojrejmdipsjdusabduybyeuwfbdsbfjsadnsndfidsfbisjrejmdid";
var y = "jrejmdi";
Search(x, y, x.length, y.length, 'mp');


/*
 ** Table of prefixes
 */

function min(x, y) {
    var _min = x < y ? x : y;
    return _min;
}

function max(x, y) {
    var _max = x > y ? x : y;
    return _max;
}

function prefixes(x, m) {
    var pref = [m];
    var g = 0,
        f = 0,
        i = 1;
    while (i < m) {
        if (i < g && pref[i - f] !== g - i) {
            pref.push(min(pref[i - f], g - i));
        } else {
            g = max(g, i);
            f = i;
            while (g < m && x[g] == x[g - f]) {
                g++;
            }
            pref.push(g - f);
        }
        i++;
    }
    return pref;
}