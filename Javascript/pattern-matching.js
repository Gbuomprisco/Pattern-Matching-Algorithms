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
            j = mpNext[j];
        }
        j++;
        i++;
        if (x[i] == x[j]) {
            kmpNext.push(kmpNext[j]);
        } else {
            kmpNext.push(j);
        }
        return kmpNext;
    }
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