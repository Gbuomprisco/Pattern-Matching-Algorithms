# Naive Search

def NaiveSearch(x, y, m, n)
    i = 0
    while i <= m - n
        j = 0
        while j < n and y[j] == x[j + i]
            j = j + 1
        end
        if j == n
            print "Y occurs in X at the position #{i}"
        end
    i = i + 1
    end
end

# Borders of a string

def borders(x, m)
    i = 0
    j = 1
    border = []
    while j < m
        border.push(i)
        while i >= 0 and x[j] != x[i]
            if i == 0
                i = -1
            else
                i = border[i - 1]
            end
        end
        i = i + 1
    j = j + 1
    end
    border.push(i)
    return border
end

# Morris-Pratt borders Algorithm

def mp_borders(x, m)
    j = -1
    i = 0
    mpNext = [j]
    while i < m - 1
        while j >= 0 and x[i] != x[j]
            j = mpNext[j]
        end
        j = j + 1
        i = i + 1
        mpNext.push(j)
    end
    mpNext.push(j + 1)
    return mpNext
end

# Knuth-Morris-Pratt borders Algorithm


def kmp_borders(x, m)
    i = 0
    j = -1
    kmpNext = [j]
    while i < m - 1
        while j >= 0 and x[i] != x[j]
            j = kmpNext[j]
        end
        i = i + 1
        j = j + 1
        if x[i] == x[j]
            kmpNext.push(kmpNext[j])
        else
            kmpNext.push(j)
        end
    end
    kmpNext.push(j)
    return kmpNext
end

# Search using MP or KMP

def search(x, y, m, n, algorithm)

    print "Preprocessing phase"

    if algorithm == 'kmp'
        _next = kmp_borders(y, n)
    elsif algorithm == 'mp'
        _next = mp_borders(y, n)
    end

    print "\nSearching phase"
    i = 0
    j = 0
    while j < m
        while (i == n) or (i >= 0 and x[j] != y[i])
            i = _next[i]
        end
        i = i + 1
        j = j + 1
        if i == n
            print "x occurs in y at the position #{j - 1}"
        end
    end
end

# Prefixes of a string

def prefixes(x, m)
    pref = [m]
    g = 0
    f = 0
    i = 1
    while i < m
        if i < g and pref[i - f] != g - i
            pref.push(min(pref[i - f], g - i))
        else
            g = max(g, i)
            f = i
            while g < m and x[g] == x[g - f]
                g = g + 1
            end
            pref.push(g - f)
        end
        i = i + 1
    end
    return pref
end

# Hash of a string

def hash(x, m, base, q)
    i = 0
    w = 1
    while i < m
        w += x[i].sum * (base ** m - i)
        i = i + 1
    end
    return w % q
end

# Search by using Karp Rubin algorithm

def karp_rabin(x, y, m, n, base, q)
    hx = hash(x, n, base, q)
    hy = hash(y, n, base, q)
    i = 0
    while i <= m - n
        if hx == hy
            j = 0
            while j < n and y[j] == x[j + i - 1]
                j = j + 1
            end
            if j == n
                print "y occurs in x at the position #{i}"
            end
        end
        w = x[i, n]
        hx = hash(w, n, base, q)
        i = i + 1
    end
end

# Bad character rule

def bad_character(x, m)
    bc = []
    bc_seen = []
    i = m - 1
    while i >= 0
        if !bc_seen.include?(x[i]) and i < m - 1
            bc_seen.push(x[i])
            bc.push(i)
        end
        i = i - 1
    end
    return bc
end

# Good Suffix rule

def good_suffix(x, m)
    gs = []
    i = 0
    d = 0
    j = m - 2
    while j >= 0
        while j == -1 or suff[i + 1] == i + 1
            if j <= m - i - 1
                gs.push(m - i - 1)
                j = j - 1
            end
        end
        i = i + 1
    end
    while d <= m - 2
        gs[suff[d]] = m - d - 1
    end
    return gs
end