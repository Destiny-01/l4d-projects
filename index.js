const boxes = document.getElementsByClassName("box");
let input = document.getElementById("result").innerText;
let calc = "";
const isNumber = /[0-9]+$/;
try {
  Array.from(boxes).forEach(function (box) {
    box.addEventListener("click", () => {
      let lastChar = input.charAt(input.length - 1);
      if (!isNumber.test(box.innerHTML)) {
        if (box.id == "delete") {
          calc = calc.slice(0, -1);
          if (isNaN(lastChar) || lastChar === " ") {
            do {
              input = input.slice(0, -1);
              lastChar = input.charAt(input.length - 1);
            } while (isNaN(lastChar) || lastChar === " ");
          } else {
            input = input.slice(0, -1);
          }
        } else if (box.id == "clear") {
          input = "0";
          calc = "0";
        } else if (box.id == "submit") {
          if (isNumber.test(lastChar)) {
            let solution = eval(calc);
            input = String(solution);
            calc = String(solution);
          }
        } else if (isNumber.test(lastChar)) {
          if (!Number.isNaN(box.innerHTML)) {
            switch (box.id) {
              case "plus":
                calc = calc + "+";
                break;
              case "minus":
                calc = calc + "-";
                break;
              case "divide":
                calc = calc + "/";
                break;
              case "multiply":
                calc = calc + "*";
                break;
              default:
                calc = calc + ".";
                break;
            }
          }
          input = input == 0 ? box.innerHTML : input + box.innerHTML;
        }
      } else {
        input = input == 0 ? box.innerHTML : input + box.innerHTML;
        calc =
          calc == 0 || calc.charAt(0) === "."
            ? box.innerHTML
            : calc + box.innerHTML;
      }
      input = input.length === 0 ? "0" : input;
      document.getElementById("result").innerHTML = input;
    });
  });
} catch (error) {
  console.log(error);
}
