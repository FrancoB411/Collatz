collatz = {
    currentNumber: 0,
    iterationCount: 1,
    printDelay: 200,
    message: { "open": "Collatz opening number is ",
               "close": "Game is over.",
               "notnum": "Not a number."
    },
    printit: function(printMe, time) {
        var $li = $("<li><p><span>" + printMe + "</span></p></li>").hide();
        $('#output_list').append($li);
        var delay = time || this.printDelay
        //setTimeout(function() {$li.fadeIn("slow");}, 1000 ); 
        $li.each(function(index, element ) {
           // setTimeout(function() {$(element).fadeIn("slow");}, delay * index );
           $(element).fadeIn();
           console.log(element, index);
           return false;
            
        })
        
        // var self = this;
        //         $li.each(function(index, element ) {
        //            // setTimeout(function() {$(element).fadeIn("slow");}, delay * index );
        //            $(element).fadeIn();
        //            console.log(element, index);
        //            self.loop(self.currentNumber);
        //            return false;
        // 
    },
    process: function(num){
        var time = this.printDelay * this.iterationCount;
        var processedNum;
        if (num % 2 === 0) {
            processedNum = num / 2;
        } else {
            processedNum = num * 3 + 1;
        }
        this.currentNumber = processedNum;
        this.printit(this.currentNumber, time ); //add time later
        this.loop(this.currentNumber);
    },
    loop: function(num) {
        if(this.currentNumber !== 1) {
            console.log(this.currentNumber);
            this.process(this.currentNumber);
            this.iterationCount++;
        } else {
             this.printit(this.message["close"]);
        }
    },
    validatesInput: function() {
        var rawInput = parseInt(document.getElementById('number_submit').value);
        if(!isNaN(rawInput)) {
            this.currentNumber = rawInput;
            return true; 
        }else{
            return false;
        }   
    },
    clearScreen: function() {
        $("li").remove();
    },
    start: function() {
        this.clearScreen();
        if(this.validatesInput()) {             
            this.printit(this.message["open"] + this.currentNumber);
            this.loop(this.currentNumber);
        } else{
            this.printit(this.message["notnum"])
        }
    }
};



//Test code    
//hotpo.printit(3); //tests printit method
//hotpo.process(2); //tests process prints
//hotpo.process(3); //tests process prints
//hotpo.start(762); //tests process prints​​