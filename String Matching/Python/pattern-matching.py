# Naive Search

def naive_search(y, x, n, m):
    i = 0
    while i <= n - m:
        j = 0
        while j < m and x[j] == y[j + i]:
            j += 1
        if j == m:
                print 'y occurs in x at the position %d' % (i)
        i += 1

# Compute borders of a string

def borders(x, m):
    i = 0
    j = 0
    border = []
    for j in range (1, m):
        border.append(i)
        while i >= 0 and x[j] != x[i]:
            if i == 0:
                i = -1
            else:
                i = border[i - 1]
        i = i + 1
    border.append(i)
    return border

# Preprocessing Morris-Pratt Algorithms

def mp_borders(x, m):
    j = -1
    i = 0
    mpNext = [j]
    for i in range(0, m - 1):
        while j >= 0 and x[i] != x[j]:
            j = mpNext[j]
        j += 1
        mpNext.append(j)
    mpNext.append(j + 1)
    return mpNext


# Preprocessing Knuth-Morris-Pratt Algorithm

def kmp_borders(x, m):
    i = 0
    j = -1
    kmpNext = [j]
    for i in range(0, m - 1):
        while j >= 0 and x[i] != x[j]:
            j = kmpNext[j]
        i += 1
        j += 1
        if x[i] == x[j]:
            kmpNext.append(kmpNext[j])
        else:
            kmpNext.append(j)
    return kmpNext


# KMP and MP Algorithms Search function

def search(x, y, m, n, algorithm):

    print "Preprocessing phase:"
    if algorithm == 'kmp':
        MP_next = kmp_borders(x, m)
    elif algorithm == 'mp':
        MP_next = mp_borders(x, m)
    print MP_next

    print "\nSearching phase:"
    i = 0
    j = 0
    while j < m:
        while (i == n) or (i >= 0 and x[j] != y[i]):
            i = MP_next[i]
        i = i + 1
        j = j + 1
        if i == n:
            print "x occurs in y at the position %d" % (j - 1)


# Table of prefixes

def prefixes(x, m):
    pref = [m]
    g = 0
    f = 0
    i = 1
    while i < m:
        if i < g and pref[i - f] != g - i:
            pref.append(min(pref[i - f], g - i))
        else:
            g = max(g, i)
            f = i
            while g < m and x[g] == x[g - f]:
                g = g + 1
            pref.append(g - f)
        i = i + 1
    return pref
