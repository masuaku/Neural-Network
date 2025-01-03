function sigmoid(x) {
  
  let y = 1/ (1+ Math.exp(-x));  
  return y;
}
function dsigmoid(x) {
  
  return sigmoid(x) * (1 - sigmoid(x));
}
function tanh(x) {
  
  return  (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
}

function dtanh(x) {
  
  return  1-(tanh(x))**2;
}


class NeuralNetwork {  
  constructor(input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;
    
    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes); // Weight matrix of input to hidden nodes.
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes); // Weight matrix of hidden to output nodes.
    this.weights_ih.randomize(); // Weight matrix is randomized.
    this.weights_ho.randomize(); // Weight matrix is randomized.
    this.bias_ih = new Matrix(this.hidden_nodes, 1); // Bias matrix of input to hidden nodes.
    this.bias_ho = new Matrix(this.output_nodes, 1); // Bias matrix of hidden to output nodes.
    this.bias_ih.randomize(); // Bias matrix is randomized.
    this.bias_ho.randomize(); // Bias matrix is randomized.
    this.learning_rate = 0.01; 
  }
  
  
  feedforward(inputs) {
    
    // Generate Feedforward Outputs
    //
    //
    let input_array = Matrix.fromArray(inputs);
    let hidden = Matrix.multiply(this.weights_ih, input_array);
    hidden = Matrix.add(hidden, this.bias_ih);
   
    // activation function for hidden layer!
    hidden = Matrix.map(hidden, tanh);
    
    //Generating the Outputs!
    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs = Matrix.add(outputs, this.bias_ho);
    
    // activation function for output layer!
    outputs = Matrix.map(outputs, tanh);
    return outputs.toArray();
  }
  
  train(inputs, targets) {
    let weights_proportioned_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    let weights_proportioned_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    let weights_total_ih = 0;
    let weights_total_ho = 0;
    // Generate Feedforward Outputs
    //
    //
    let input_array = Matrix.fromArray(inputs);
    let hidden = Matrix.multiply(this.weights_ih, input_array);
    hidden = Matrix.add(hidden, this.bias_ih);
   
    // activation function for hidden layer!
    hidden = Matrix.map(hidden, tanh);
    
    //Generating the Outputs!
    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs = Matrix.add(outputs, this.bias_ho);
    
    // activation function for output layer!
    outputs = Matrix.map(outputs, tanh);
    
    // Start of Backpropagation!!!!!
    //
    //
    //Convert array to matrix object
    let target_array = Matrix.fromArray(targets);  
    
    // Calculate change in Hidden -> Output weights!!
    // Calculate Output Errors
    let output_errors = Matrix.subtract(target_array, outputs);
    
    // Output Errors Proportioned
    for (let i = 0; i < this.weights_ho.rows; i++){  
      for (let j = 0; j < this.weights_ho.cols; j++){  
        weights_total_ho = weights_total_ho + this.weights_ho.data[i][j]; 
      }    
    }
    
    for (let i = 0; i < this.weights_ho.rows; i++){  
      for (let j = 0; j < this.weights_ho.cols; j++){  
        this.weights_ho.data[i][j] = this.weights_ho.data[i][j] / weights_total_ho;
        weights_proportioned_ho.data[i][j] = this.weights_ho.data[i][j];
      }    
    }
    
    // Calculate Output Gradient
    let gradients = Matrix.map(outputs, dtanh);
    gradients = Matrix.multiplyScalar(gradients, output_errors);
    gradients = Matrix.multiplyScalar(gradients, this.learning_rate);
    // Calculate deltas
    let hidden_T = Matrix.transpose(hidden);  // Transpose hidden activations
    let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);
    
    // Adjust the weights by deltas
    this.weights_ho = Matrix.add(this.weights_ho, weights_proportioned_ho);
    // Adjust the bias by its deltas (which is just the gradients)
    this.bias_ho = Matrix.add(this.bias_ho, gradients);
    //
    //
    //
    // Calculate change in Input -> Hidden weights!!
    // Calculate Hidden Errors
    // normalizing with total hidden to output weights
    //
    //
    
    let weights_ho_T = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(weights_ho_T, output_errors);
    
    // Hidden Errors Proportioned
    for (let i = 0; i < this.weights_ih.rows; i++){  
      for (let j = 0; j < this.weights_ih.cols; j++){  
        weights_total_ih = weights_total_ih + this.weights_ih.data[i][j];
      }    
    }
    
    for (let i = 0; i < this.weights_ih.rows; i++){  
      for (let j = 0; j < this.weights_ih.cols; j++){  
        this.weights_ih.data[i][j] = this.weights_ih.data[i][j] / weights_total_ih;
        weights_proportioned_ih.data[i][j] = this.weights_ih.data[i][j];
      }    
    }
    
    // Calculate Hidden Gradient
    let hidden_gradient = Matrix.map(hidden, dtanh);
    hidden_gradient = Matrix.multiplyScalar(hidden_gradient, hidden_errors);
    hidden_gradient = Matrix.multiplyScalar(hidden_gradient, this.learning_rate);
    
    // Calculate deltas
    let inputs_T = Matrix.transpose(input_array);  // Transpose inputs
    let weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);
    
    
    // Adjust the weights by deltas
    this.weights_ih = Matrix.add(this.weights_ih, weights_proportioned_ih);
    // Adjust the bias by its deltas (which is just the gradients)
    this.bias_ih = Matrix.add(this.bias_ih, hidden_gradient);
  }  
}
