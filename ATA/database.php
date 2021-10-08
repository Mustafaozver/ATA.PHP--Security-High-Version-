<?php
/*

ATA.PHP Database control

ID : main identify
other table conn : [Tablename]ID
  ForExample: UsersID = Users.ID

*/

$_db = mysqli_connect($ata["database"]["HOST"], $ata["database"]["user"], $ata["database"]["password"], $ata["database"]["name"]);
mysqli_query($_db,"SET NAMES utf8");

class DBMotor {
	public function RunQuery($sql) {
		global $_db;
		return mysqli_query($_db, $sql);
	}

	public function GetLastID() {
		global $_db;
		return ($_db->insert_id);
	}

	public function AddRow($toadd, $tablename) {
		$params = array();
		$values = array();
		foreach ($toadd as $param => $value) {
			array_push($params,$param);
			array_push($values,$value);
		}
		$sql = "INSERT INTO ".$tablename." (".implode(",",$params).") VALUES (\"".implode("\",\"",$values)."\");";
		return ($this->RunQuery($sql) === true);
	}

	public function DeleteRow($tablename, $where) {
		$sql = "DELETE FROM ".$tablename;
		if (isset($where)) $sql.= " WHERE ".$where;
		return ($this->RunQuery($sql) === true);
	}

	public function CountRows($tablename, $where) {
		$sql = "SELECT * FROM ".$tablename;
		if (isset($where)) $sql.= " WHERE ".$where;
		$result = $this->RunQuery($sql);
		return $result->num_rows;
	}

	public function ReadRows($tablename, $where) {
		$sql = "SELECT * FROM ".$tablename;
		if (isset($where)) $sql.= " WHERE ".$where;
		$result = $this->RunQuery($sql);
		$finalrow = array();
		if ($result->num_rows == 1) {
			$rows = array();
			while($row = $result->fetch_assoc()) foreach ($row as $param => $value) $rows["".$param] = $value;
			return $rows;
		} else if ($result->num_rows > 0) {
			$rows = array();
			while($row = $result->fetch_assoc()) {
				foreach ($row as $param => $value) $rows["".$param] = $value;
				array_push($finalrow,$rows);
			}
			return $finalrow;
		} else //echo $sql;
		return false;
	}

	public function GetRow($id, $tablename) {
		$sql = "SELECT * FROM ".$tablename." WHERE ID=\"".$id."\"";
		$result = $this->RunQuery($sql);
		if ($result->num_rows == 1) {
			if ($row = $result->fetch_assoc()) foreach ($row as $param => $value) $rows["".$param] = $value;
			return $rows;
		} else return false;
	}

	public function UpdateRow($toadd, $tablename) {
		if (isset($toadd["ID"])) {
			$id = "".$toadd["ID"];
			$sql = "UPDATE ".$tablename;
			$updates = array();
			unset($toadd["ID"]);
			foreach ($toadd as $param => $value) array_push($updates, $param."=\"".$value."\"");
			$sql .= " SET ".implode(", ",$updates)." WHERE ID=\"".$id."\"";
			return (RunQuery($sql) === true);
		} else return false;
	}
}

$DB = new DBMotor();

?>