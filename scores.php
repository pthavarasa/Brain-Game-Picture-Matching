<?php
	$monfichier = fopen('score.txt','r');
	$count=0;
	$data = array();
        while(!feof($monfichier)){
            $array_line = explode(':',fgets($monfichier));
			array_push($data, array($array_line[0],intval($array_line[1])));
			$count++;
        }
        fclose($monfichier);
		for($i=0;$i<count($data);$i++){
			$val = $data[$i];
			$j = $i-1;
			while($j>=0 && $data[$j][1] < $val[1]){
				$data[$j+1] = $data[$j];
				$j--;
			}
			$data[$j+1] = $val;
		}
?>

<!Doctype html>
<html lang="fr">
        <head>
                <meta charset="UTF-8">
                <title>Scores | JeuUP8</title>
                <link rel="stylesheet" type="text/css" href="./style.css">
                <script src="./script.js"></script>
        </head>
        <script>
                console.log("Hello world!");
        </script>
        <body>
                <header>
                        <nav>
                                <ul>
                                        <li><a href="./index.html">Jeu</a></li>
                                        <li><a href="./scores.html">Scores</a></li>
                                </ul>
                        </nav>
                </header>
                <main>
					<div class="leaderboard">
						<div class="label">
							<img src="https://user-images.githubusercontent.com/23297041/55285200-a24e9b00-538f-11e9-8990-d49a162824d1.png" height="42" width="42">
							<h1>Clasification</h1>
						</div>
						<ol class="rank">
							<?php
									for($i=0;$i<count($data);$i++){
										echo '<li>';
										echo '<strong>'.$data[$i][0].'</strong>';
										echo '<span>'.$data[$i][1].'</span>';
										echo '</li>';
									}
							?>
						</ol>
					</div>
                </main>
        </body>
</html>
