<?php
namespace Classes;
use Classes\Config;
class DB {
    private static $_instance = null;
    private $_pdo,
            $_error = false,
            $_query,
            $_errorMsg,
            $_results,
            $_count = 0;
    private function __construct() 
    {
        try {
            $this->_pdo = new \PDO('mysql:host='.Config::get('mysql/servername') . ';dbname=' . Config::get('mysql/database') , Config::get('mysql/username'), Config::get('mysql/password'));
        }
        catch(PDOException $e ) {
            die($e->getMessage());
        }
    }
    public function errorMsg() {
        return $this->_errorMsg;
    }
    public static function getInstance()
    {
        if(!isset(self::$_instance))
        {
            self::$_instance=new DB();
        }

        return self::$_instance;
    }
    public function everythingOk()
    {
        return !$this->_error && $this->_count!=0;
    }
    public function query($sql,$params = array())
    {
        $this->_error = false;
        if($this->_query = $this->_pdo->prepare($sql))
        {
            $x=1;
            if(count($params))
            {
                //print_r($params);
                foreach($params as $param) {
                    $this->_query->bindValue($x,$param);
                    $x++;
                }
            }

            if($this->_query->execute())
            {
                //echo $this->_query->debugDumpParams();   
                $this->_results=$this->_query->fetchAll(\PDO::FETCH_OBJ);
                $this->_count=$this->_query->rowCount();
            }
            else
            {
                $this->_error=true;
                $this->_errorMsg = $this->_query->errorInfo();
            }
        }
        
        return $this;
    }

    public function action($action,$table,$where=array()) {
        if(count($where)===3)
        {
            $operators = array('=','>','<','>=','<=');

            $field = $where[0];
            $operator = $where[1];
            $value = $where[2];

            if(in_array($operator,$operators)) {
                $sql = "{$action} FROM {$table} WHERE {$field} {$operator} ?";
                $this->query($sql,array($value));
                if(!$this->error())
                {
                    return $this;
                }
            }
        }
        else
        {
            if(count($where)===0)
            {
                $sql = "{$action} FROM {$table} WHERE true";
                $this->query($sql);
                if(!$this->error())
                {
                    return $this;
                }
            }
        }

        return false;
    }

    public function insert($table,$fields=array())
    {
        $this->_error=false;
        $keys = array_keys($fields);
        $value = "";
        $x=1;

        foreach($fields as $field) 
        {
            $value .= "?";
            if($x<count($fields))
                $value .= ", ";
            $x++;
        }

        $sql = "insert into ".$table." (`".implode('`,`',$keys)."`) values ($value)";
        $params = array_values($fields);
        $this->query($sql,$params);
        if(!$this->error())
        {
            $this->_results=true;
            return true;
        }
        else
            return false;
    }

    public function update($table,$id,$fields=array())
    {
        $this->_error = false;
        $set = '';
        $x = 1;
        foreach($fields as $field=>$value)
        {
            $set.= "{$field} = ?";
            if($x<count($fields))
                $set .= ", ";
            $x++;
        }
        // get primary key 
        $pk = $this->query("show keys from $table where key_name='primary'")->first()->Column_name;
        
        $sql="update {$table} set {$set} where $pk='{$id}'";
        
        if(!$this->query($sql,$fields)->error())
            return true;
        else
        {
            var_dump($this->error());
        }
    }
    public function error() {
        return $this->_error;
    }

    public function get($table,$where=array())
    {
        return $this->action("select *",$table,$where);
    }

    public function delete($table,$where=array())
    {
        return $this->action("Delete",$table,$where);
    }

    public function count()
    {
        return $this->_count;
    }

    public function result()
    {
        return $this->_results;
    }

    public function first() 
    {
        return $this->result()[0];
    }
}
    
?>