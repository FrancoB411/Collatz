$(document).ready(function() {
    
    "use strict";
    var collatz = {
        rawInput: 0,
        currentNumber: 0,
        iterationCount: 1,
        delayTime: 100,
        fadeIn: 200,
        fadeAccell: 1,
        printQ: [],
        message: { "open": "Collatz opening number is ",
                   "close": "Game is over.",
                   "notnum": " is not a positive number."
                },
        delayPrint: function() {
          this.printIt();
        },
        printIt: function () {
            //console.log(this.printQ);
            if(this.printQ.length > 0) {
                var printMe = this.getFromPrintQ();
                var $li = $("<li><p>" + printMe + "</p></li>");
                $li.hide();
                $('#output_list').append($li);
                $li.fadeIn(this.fadeIn);
                var _this = this;
                setTimeout(function() { _this.delayPrint(); }, _this.delayTime);
            }
        },
        addToPrintQ: function (thingToPrint) {
            this.printQ.push(thingToPrint);
        },
        getFromPrintQ: function () {
            var first = this.printQ.splice(0,1)
            return first[0];
        },
        process: function (num) {
            var processedNum;
            if (num % 2 === 0) {
                processedNum = num / 2;
            } else {
                processedNum = num * 3 + 1;
            }
            this.currentNumber = processedNum;
            this.addToPrintQ(this.currentNumber + '');
            this.loop(this.currentNumber);
        },
        loop: function () {
            if (this.currentNumber !== 1) {
                this.process(this.currentNumber);
                this.iterationCount += 1;
            } else {
                this.addToPrintQ(this.message.close);
                this.delayPrint();
            }
        },
        validatesInput: function () {
            this.rawInput = $('input#number_submit').val();
            if (!isNaN(parseInt(this.rawInput, 10))) {
                this.currentNumber = this.rawInput;
                return 1; 
            } else {
                return false;
            }
        },
        clearScreen: function () {
            $("ul").children().remove();
        },
        start: function () {
            this.clearScreen();
            if (this.validatesInput()) {
                this.addToPrintQ(this.message.open + this.currentNumber);
                this.loop(this.currentNumber);
            } else {
                this.addToPrintQ(this.rawInput + this.message.notnum);
            }
        }
    };
    
    
    $('#submit_button').click(function(){
        collatz.start();
    });
    
});

//Test code    
//hotpo.printit(3); //tests printit method
//hotpo.process(2); //tests process prints
//hotpo.process(3); //tests process prints
//hotpo.start(762); //tests process prints

// var self = this;
//         $li.each(function(index, element ) {
//            // setTimeout(function() {$(element).fadeIn("slow");}, delay * index );
//            $(element).fadeIn();
//            console.log(element, index);
//            self.loop(self.currentNumber);
//            return false;
