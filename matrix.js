  let inpx1 = 2;
  let inpy1 = 3;
  let inpx2 = 3;
  let inpy2 = 2; 

class Matrix {
  // there are three different vector multiplication methods which are Scalar Product, Hadamard Product and Matrix Product
  // in this code, Hadamard (elementwise) data multplication is not considered but the other two (data and scalar product) cases considered while making multiplication operations. 
  constructor(rows, cols) {
    this.rows = rows;  
    this.cols = cols;
    this.data = [];

    for (let i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = 0;
      }
    } 
  }
  
  static multiply(m1, m2) { // parameter in brackets is used instead of return value if not used then return should be specified at the end of the function.
    let result = new Matrix(m1.rows, m2.cols);
    if ((m1.cols !== m2.rows)) {    
      console.log("Number of columns in the first multiplier is not equal to number of rows in the second multiplier!");
    } 
    else{  
      for (let i = 0; i < m1.rows; i++) {
        for (let j = 0; j < m2.cols; j++) {
          let sum = 0;
          for (let k = 0; k < m1.cols; k++) {
            sum += m1.data[i][k] * m2.data[k][j];
          }
          result.data[i][j] = sum;
        }
      }
      return result;
    }
  }
  
  static fromArray(arr) {
    let m = new Matrix(arr.length, 1);
      for (let i = 0; i < arr.length; i++) {
        m.data[i][0] = arr[i];
      }
    return m;
  }
  
  toArray() {    
    let arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j]);
      }
    }
   return arr; 
  }
  
  static multiplyScalar(m1, m2) {
    let result = new Matrix(m1.rows, m1.cols);
    if (m2 instanceof Matrix) {
      if (m1.rows !== m2.rows || m1.cols !== m2.cols) {
        console.error("Matrices must be the same size for element-wise multiplication!");
        return null;
      }
      for (let i = 0; i < m1.rows; i++) {
        for (let j = 0; j < m1.cols; j++) {
          result.data[i][j] = m1.data[i][j] * m2.data[i][j];  // Element-wise multiplication
        }
      }
    } else {
      for (let i = 0; i < m1.rows; i++) {
        for (let j = 0; j < m1.cols; j++) {
          result.data[i][j] = m1.data[i][j] * m2;  // Scalar multiplication
        }
      }
    }
    return result;  
  }
  
   static divide(d1, d2) {
    let result = new Matrix(d1.rows, d1.cols);
    // Hadamard Division
    if (d2 instanceof Matrix) {   
      for (let i = 0; i < d1.rows; i++) {
        for (let j = 0; j < d2.cols; j++) {
          d1.data[i][j] = d1.data[i][j] / d2.data[i][j];
        }
      }  
    } else {
    // Scalar Division
      for (let i = 0; i < d1.rows; i++) {
        for (let j = 0; j < d2.cols; j++) {
          d1.data[i][j] = d1.data[i][j] / d2;
        }
      }
    }
    return result;
  }
  
  static add(a1, a2) {
    let result = new Matrix(a1.rows, a2.cols);
    //Elementwise data addition check
    if (a2 instanceof Matrix) {    
      for (let i = 0; i < a1.rows; i++) {
        for (let j = 0; j < a1.cols; j++) {
          result.data[i][j] = a1.data[i][j] + a2.data[i][j];
        }
      }  
    }
    //Scalar data addition check
    
    else {
      for (let i = 0; i < a1.rows; i++) {
        for (let j = 0; j < a2.cols; j++) {
          result.data[i][j] = a1.data[i][j] + a2;
        }
      }  
    }
    return result;
  }

  static subtract(s1, s2) {
    let result = new Matrix(s1.rows, s1.cols);
        
      if (s2 instanceof Matrix) {    
        for (let i = 0; i < s1.rows; i++) {
          for (let j = 0; j < s1.cols; j++) {
            result.data[i][j] = s1.data[i][j] - s2.data[i][j];
          }
        }  
      }
      else {
        for (let i = 0; i < s1.rows; i++) {
          for (let j = 0; j < s1.cols; j++) {
            result.data[i][j] = s1.data[i][j] - s2;
          }
        }  
      }
    return result;
  }
  
 randomize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = Math.random() - 0.5;
         // Array of this.data will accumulate all the matrix data when it is written in this plain form and can be assigned to another array totally.
      }
    }
    return this;
  }
  
  static map(matrix, func){
    let result = new Matrix(matrix.rows, matrix.cols);
    //apply any function property to  any value in the matrix. 
    for (let i = 0; i < matrix.rows; i++){
      for (let j = 0; j < matrix.cols; j++){
        let val = matrix.data[i][j];
        result.data[i][j] = func(val);
      }
    }
    return result;
  }
  
  static transpose(t) {
    
    let transposed = new Matrix(t.cols, t.rows);

    for (let i = 0; i < t.rows; i++) {
      for (let j = 0; j < t.cols; j++){
        transposed.data[j][i] = t.data[i][j];
      }
    }
    return transposed;
  }
  print() {
    return console.table(this.data);
  } 
}

  //let m1 = new Matrix(inpx1, inpy1); // For instance methods (not static), you should at first create an instance of a class outside of class and then call it on outside: e.g. let m1 = new Matrix(inpx1, inpy1) and m1.randomize();.
  //let m2 = new Matrix(inpx2, inpy2);
// For static methods, function of a class can be directly called by using the class name without creating an  instance: e.g. Matrix.randomize();
  
  //m1.randomize();
  //m2.randomize();
  //m1.print();
  //m2.print();
  //console.log(typeof sum);
  /*
  let multiplicationResult = Matrix.multiply(m1,m2);
    if (multiplicationResult) {
      multiplicationResult.print();
    }
  */
  //console.table(Matrix.multiply(m1,m2))
  //m1.map(doubleIt);
  //m1.print();
  //console.table(Matrix.fromArray(arr));
  //let sonucA = Object.assign(a, m2);// Properties of one object is transferred to the other but not create a copy of an object it only gets info from reference object which means if reference object changes, this one oalso changes.





