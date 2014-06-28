/*
 ** Naive search
 */

def NaiveSearch( x: String, y: String ) {
	var i = 0
	var n = x.length
	var m = y.length

	while ( i <= n - m ) {
		var j = 0

		while ( j < m && x( i + j ) == y( j ) ) {
			j += 1
		}

		if ( j == m ) {
			println( "Y occurs in X at the position:" + i )
		}
		i += 1
	}
}

/*
 ** Compute borders of a string
 */

def Borders( x: String, m: Int ): Array[Int] = {
	var i = 0
	var j = 1
	var borders = new Array[Int]( m )
	while ( j < m ) {
		borders( j ) = i
		while ( i >= 0 && x( j ) != x( i ) ) {
			if ( i == 0 ) {
				i = i - 1
			} else {
				i = borders( i - 1 )
			}
		}
		i = i + 1
		j = j + 1
	}
	borders
}

def Hash( x: String, m: Int, base: Int, q: Int ): Int = {
	var i = 0
	var j = 1
	while ( i < m ) {
		j = ( j + x.codePointAt( i ) * Math.pow( base, m - i ) ).toInt
		i = i + 1
	}
	j % q
}

def KarpRabin( x: String, y: String, m: Int, n: Int, d: Int, q: Int ) {
	var i = 0
	var hx = Hash( x, n, d, q )
	var hy = Hash( y, n, d, q )
	var j = 0
	var substr = ""
	while ( i <= m - n ) {
		println( hx, hy )
		if ( hx == hy ) {
			j = 0
			while ( j < n && y( j ) == x( i + j ) ) {
				j = j + 1
			}
			if ( j == n ) {
				println( "y occurs in x at the position " + i )
			}
		}
		println( i )
		substr = x.substring( i + 1, i + n );
		hx = Hash( substr, substr.length, d, q );
		i = i + 1;
	}
}

/*
 ** Preprocessing Morris-Pratt Algorithm
 */

def MP_Next( x: String, m: Int ): Array[Int] = {
	var j = -1
	var i = 0
	var mpNext = new Array[Int]( m )
	mpNext( 0 ) = -1
	while ( i < m - 1 ) {
		while ( j >= 0 && x( i ) != x( j ) ) {
			j = mpNext( j )
		}
		i = i + 1
		j = j + 1
		mpNext( i ) = j
	}
	mpNext
}

/*
 ** Preprocessing Knuth-Morris-Pratt Algorithm
 */

def KMP_Next( x: String, m: Int ): Array[Int] = {
	var j = -1
	var i = 0
	var result = 0
	var kmpNext = new Array[Int]( m )
	kmpNext( 0 ) = -1

	while ( i < m - 1 ) {

		while ( j >= 0 && x( i ) != x( j ) ) {
			j = kmpNext( j )
		}
		i = i + 1
		j = j + 1

		if ( x( i ) == x( j ) ) {
			result = kmpNext( j )
		} else {
			result = j
		}
		kmpNext( i ) = result
	}
	kmpNext
}

/*
 ** KMP and MP Algorithms Search function
*/

object Search {

	def getBorders( algorithm: String ): Array[Int] = {

		if ( algorithm == "kmp" ) {
			KMP_Next( x, m )
		} else if ( algorithm == "mp" ) {
			MP_Next( x, m )
		} else {
			Array()
		}
	}

	def search( x: String, y: String, m: Int, n: Int, algorithm: String ) {

		val borders = getBorders( algorithm )

		if ( borders.length == 0 ) {
			println( "Choose an algorithm [kmp, mp]" )
			return
		}

		var i = 0
		var j = 0

		while ( j < m ) {
			while ( i == n || ( i >= 0 && x( j ) != y( i ) ) ) {
				i = borders( i )
			}

			i = i + 1
			j = j + 1

			if ( i == n ) {
				println( "x occurs in y at the position " + ( j - 1 ) )
			}
		}
	}
}

/*
 ** Table of prefixes
 */

def min( x: Int, y: Int ): Int = {
	if ( x < y ) x else y
}

def max( x: Int, y: Int ): Int = {
	if ( x > y ) x else y
}

def prefixes( x: String, m: Int ): Array[Int] = {
	var pref = new Array[Int]( m )
	pref( 0 ) = m
	var g = 0
	var f = 0
	var i = 1
	while ( i < m ) {
		if ( i < g && pref( i - f ) != g - i ) {
			pref( i ) = min( pref( i - f ), g - i );
		} else {
			g = max( g, i );
			f = i;
			while ( g < m && x( g ) == x( g - f ) ) {
				g += 1;
			}
			pref( i ) = g - f;
		}
		i += 1;
	}
	pref;
}