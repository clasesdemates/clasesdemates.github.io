#
# Calculadora matricial v.1
#




sub comprobar_sintaxis {
	my ($r_mat) = shift;

	my $cantidad_columnas =  @{$r_mat->[0]};
	for (1...@$r_mat-1)
	{
		return 0 unless( $cantidad_columnas == @{$r_mat->[$_]} );

	}

	return 1;

}




sub menor {

	my $o_mat = shift;

	my @filas_elegidas = @{shift @_};

	my @columnas_elegidas = @{shift @_};

	my @r_mat;

	foreach ( @$o_mat[@filas_elegidas] )
		{
			push @r_mat, [ @$_[@columnas_elegidas] ];

		}

	return \@r_mat;

}




sub determinante {

	my $r_mat = shift;

	my $orden_matriz = @$r_mat;

	return $r_mat->[0][0] if( $orden_matriz == 1);

	my $suma = 0;

	for (0...$orden_matriz-1)
	{
		$suma += (-1)**$_ * $r_mat->[0][$_] * 
				determinante(menor($r_mat, [1...$orden_matriz-1], [0...$_-1,$_+1...$orden_matriz-1]) );

	}


return $suma;

}





sub subconjuntos_tamanio_fijo {

	my $primero_coleccion = shift;
	my $ultimo_coleccion = shift;
	my $k = shift;

	if ($k == 1)
	{
		return [map {[$_]} ($primero_coleccion...$ultimo_coleccion)]
	}

	if ($k == ($ultimo_coleccion-$primero_coleccion + 1))
	{
		return [[$primero_coleccion...$ultimo_coleccion]]
  	}

	my @a =  map { unshift(@{$_},$primero_coleccion); $_ } 
				@{ subconjuntos_tamanio_fijo($primero_coleccion+1, $ultimo_coleccion,$k-1) };
	my @b = @{ subconjuntos_tamanio_fijo($primero_coleccion+1, $ultimo_coleccion,$k) };


	[ @a , @b ]

}



sub producto_matricial {
	my ($r_mat1, $r_mat2) = @_; # Cogemos las matrices por referencia

	my ($r_producto); # Devolvemos una referencia a la matriz resultando del producto

	my ($r1, $c1) = cuenta_filas_y_columnas ($r_mat1);

	my ($r2, $c2) = cuenta_filas_y_columnas ($r_mat2);

	die "La matriz 1 tiene $c1 columnas y la matriz 2 tiene $r2 filas."
		. " No podemos hacer la multiplicación.\n" unless ($c1 == $r2);

	for ($i = 0; $i < $r1; $i++) 
	{

		for ($j = 0; $j < $c2; $j++) 
		{

			$suma = 0;

			for ($k = 0; $k < $c1; $k++) {

				$suma += $r_mat1->[$i][$k] * $r_mat2->[$k][$j];

			}

			$r_producto->[$i][$j] = $suma;
		}
	}

	$r_producto;
}


sub cuenta_filas_y_columnas {

	my ($r_mat) = @_;

	my $numero_filas = @$r_mat;

	my $numero_columnas = @{$r_mat->[0]}; # Asume que todas las filas tiene el mismo número de columnas

	($numero_filas , $numero_columnas );
}



sub leer_matriz_en_archivo {

	my ($nombre_archivo) = shift;

	open (F, $nombre_archivo) || die "No se pudo abrir $nombre_archivo: $!";

	while ($linea = <F>) 
	{
		chomp($linea);

		next if $linea =~ /^\s*$/;

		if ($linea =~ /^([A-Za-z]\w*)/) {

			$nombre_matriz = $1;

		} else {

			my (@fila) = split (/\s+/, $linea);

			push (@{$nombre_matriz}, \@fila );

			}
	}

	close(F);
}


sub mostrar_matriz {

	my ($r_mat) = shift;

	my ($r, $c) = cuenta_filas_y_columnas ($r_mat);

	for ($i = 0; $i < $r; $i++)
	{
		for ($j = 0; $j < $c; $j++)
		{
  
  			print "$r_mat->[$i][$j]\t";
		}

	print "\n";
	
	}

}
