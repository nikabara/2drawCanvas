window.addEventListener("load", () => {
  let Color_Options_DropDown = document.querySelector(".Color_Options_DropDown");
  let Color_Options_DropDown_Id = document.getElementById("Color_Options_DropDown_Id");
  let Stroke_Size_DropDown = document.querySelector(".Stroke_Size_DropDown");
  let Clear_Canvas = document.querySelector(".Clear_Canvas");
  let Color_Options = document.querySelector(".Color_Options");
  let Color_Options_Id = document.getElementById("Color_Options_Id");
  let All_Color_Options = document.querySelectorAll(".Color");
  let Size_Options = document.querySelector(".Size_Options");
  let Size_Options_Id = document.getElementById("Size_Options_Id");
  let All_Sizes_Options = document.querySelectorAll(".Sizes");
  let Options = document.querySelector(".Options");
  let Undo_Canvas_Drawing = document.querySelector(".Undo_Canvas_Drawing");
  let Reverse_Canvas_Drawing_Id = document.getElementById("Reverse_Canvas_Drawing_Id");
  let Redo_Canvas_Drawing = document.querySelector(".Redo_Canvas_Drawing");
  let Redo_Canvas_Drawing_Id = document.getElementById("Redo_Canvas_Drawing_Id");
  let Erase_Canvas_Drawing = document.querySelector(".Erase_Canvas_Drawing");
  let Erase_Canvas_Drawing_Id = document.getElementById("Erase_Canvas_Drawing_Id");
  let Paint_Canvas_Drawing = document.querySelector(".Paint_Canvas_Drawing");
  let Paint_Canvas_Drawing_Id = document.getElementById("Paint_Canvas_Drawing_Id");
  let Brush = document.querySelector(".Brush");
  let Brush_Id = document.getElementById("Brush_Id");
  let Eraser = document.querySelector(".Eraser");
  let Eraser_Id = document.getElementById("Eraser_Id");
  let ColorSvg_Id = document.getElementById("ColorSvg_Id")
  let ColorSvg = document.querySelector(".ColorSvg");
  let MoreLineSize = document.querySelector(".size11");
  let SizeConfig_Id = document.getElementById("SizeInput_Id");
  let SizeConfigValue = document.querySelector(".SizeInput").value;
  let ZoomInOut = document.querySelector(".Zoom_In_Out");
  let ZoomInOutId = document.getElementById("Zoom_In_Out_Id");
  let ZoomInLogoFollow_Id = document.getElementById("ZoomInLogoFollow_Id");
  let ZoomOutLogoFollow_Id = document.getElementById("ZoomOutLogoFollow_Id");
  let ShapesDivId = document.getElementById("ShapesDiv_Id");

  
  const Canvas = document.getElementById("canvas");
  const Context = Canvas.getContext("2d");

  Canvas.width = window.innerWidth;
  Canvas.height = window.innerHeight -65;

  window.addEventListener("resize", () => {
    Canvas.width = window.innerWidth;
      Canvas.height = window.innerHeight -65;
  });



function ModePaintTrue(e){
  ModePaint = true;
  ModeDraw(e);
}

let MaximumSave = 5;
let maxLength = 0;

function ModePaintFalse(){
  ModePaint = false;
  Context.beginPath();
  
  // console.log(Restore_Array);
  // console.log(Index);
  Restore_Array.unshift(Context.getImageData(0, 0, Canvas.width, Canvas.height));
  Index += 1;
  // console.log(Index);

  console.log(Restore_Array);
}


function ModeDraw(e){
if(!ModePaint) return;
Context.lineWidth = GeneralLineWidth;
Context.strokeStyle = GeneralColor;
Context.lineCap = "round";
Context.lineTo(e.clientX, e.clientY);
Context.stroke();
Context.beginPath();
Context.moveTo(e.clientX, e.clientY);
}
let ModePaint = false;


Canvas.addEventListener("mousedown", ModePaintTrue);
Canvas.addEventListener("mouseup", ModePaintFalse);
Canvas.addEventListener("mousemove", ModeDraw);




Paint_Canvas_Drawing.addEventListener("click", () => {
Context.globalCompositeOperation = "source-over";
Canvas.addEventListener("mousedown", ModePaintTrue);
Canvas.addEventListener("mouseup", ModePaintFalse);
Canvas.addEventListener("mousemove", ModeDraw);
});
Erase_Canvas_Drawing.addEventListener("click", () => {
  Canvas.addEventListener("mousedown", ModePaintTrue);
  Canvas.addEventListener("mouseup", ModePaintFalse);
  Canvas.addEventListener("mousemove", ModeDraw);
Context.globalCompositeOperation = "destination-out";
});


Canvas.addEventListener("mousedown", () => {
  if (Restore_Array.length == maxLength) {
    maxLength++;
    console.log("max length : " + maxLength);
  }
});

let Restore_Array = [];
let Unstore_Array = [];
let Index = -1;

// <undo button>
Undo_Canvas_Drawing.addEventListener("click", () => {
    if (Index <= 0 ) {
        Index = 0;
        Context.clearRect(0, 0, Canvas.width, Canvas.height)
    }
    else{
      Unstore_Array.unshift(Restore_Array[0]);
            Restore_Array.shift();
            Context.putImageData(Restore_Array[0], 0, 0)
            console.log(`Restore: ${Restore_Array}`);
            Index -= 1;
            console.log(Index);
    }
});
// </undo button>

// <redo button>
Redo_Canvas_Drawing.addEventListener("click", () => {
  if (Restore_Array.length < maxLength) {
    Restore_Array.unshift(Unstore_Array[0]);
    Unstore_Array.shift();
    Context.putImageData(Restore_Array[0], 0, 0);
    Index++;
    console.log(Index);
  }
});
// </redo button>

  let ctrl = false;
  let z = false;
  let UndoShortcutArray = [];

// <ctrl + z undo function>
  window.addEventListener("keydown", (e) => {
    if (e.keyCode == 90) {
      z = true;
      //console.log("ctrl is true")
    }
    if (e.keyCode == 17) {
      ctrl = true;
      //console.log("z is true")
    }
    if (ctrl == true && z == true) {
      UndoShortcutArray.push("ctrl");
      UndoShortcutArray.push("z");
    }

          if (z == true && ctrl == true) {
            if (Index <= 0 ) {
              Index = 0;
              Context.clearRect(0, 0, Canvas.width, Canvas.height)
          }
          else{
            Unstore_Array.unshift(Restore_Array[0]);
                  Restore_Array.shift();
                  Context.putImageData(Restore_Array[0], 0, 0)
                  console.log(`Restore: ${Restore_Array}`);
                  Index -= 1;
          }
    }
  });
  window.addEventListener("keyup", (e) => {
    if ( e.keyCode !== 17) {
      z = false;
      //console.log("ctrl is false")
    }
    if (e.keyCode !== 90) {
      ctrl = false;
      //console.log("z is false")
    }
    if (UndoShortcutArray.length <= 2) {
      UndoShortcutArray.length = 0;
    }
  });
// </ctrl + z undo function>

  let y = false;
  let RedoShortcutArray = [];

// <ctrl + y redo function>
  // window.addEventListener("keydown", (e) => {
  //   if (Restore_Array.length < maxLength) {
  //     console.log(maxLength);
  //     if (e.keyCode == 89) {
  //       y = true;
  //     }
  //     if (e.keyCode == 17) {
  //       ctrl = true;
  //     }
  //     if (y == true && ctrl == true) {
  //       RedoShortcutArray.push("ctrl");
  //       RedoShortcutArray.push("y");
  //     }
  
  //     if (y == true && ctrl == true) {
  //       if (Index <= 0 ) {
  //         Index = 0;
  //         Context.clearRect(0, 0, Canvas.width, Canvas.height)
  //     }
  //     else{
  //       Restore_Array.unshift(Unstore_Array[0]);
  //       Unstore_Array.shift();
  //       Context.putImageData(Restore_Array[0], 0, 0);
  //       Index++;
  //     }
  // }
  //   }
  // });
  // window.addEventListener("keyup", (e) => {
  //   if (e.keyCode == 89) {
  //     y = false;
  //   }
  //   if (e.keyCode == 17) {
  //     ctrl = false;
  //   }
  //   if (RedoShortcutArray.length <= 2) {
  //     RedoShortcutArray.length = 0;
  //   }
  // });
// </ctrl + y redo function>


let ColorMain_Id = document.getElementById("ColorMain_Id");
let color6_Id = document.getElementById("color6_Id");

let Count10 = 0;

color6_Id.addEventListener("click", () => {
  Count10++;

  if (Count10 % 2 !== 0) {
    ColorMain_Id.style.display = "inline-block";
  }
  else{
    ColorMain_Id.style.display = "none";
  }
});


let colorIndicator = document.getElementById("color-indicator");
const colorPicker = new iro.ColorPicker("#color-picker", {
    width: 180, color: "#fff"
});
colorPicker.on('color:change', function (color) {
    colorIndicator.style.backgroundColor = color.hexString;
    GeneralColor = color.hexString;
    ColorSvg_Id.style.color = color.hexString;

    colorIndicator.addEventListener("click", function() {
      GeneralColor = color.hexString;
    });
})

colorIndicator.addEventListener("mouseover", () => {
  let hint = "";
  colorIndicator.innerHTML = hint;
});
colorIndicator.addEventListener("mouseout", () => {
  colorIndicator.innerHTML = "click to pick this\n color";
});


  Clear_Canvas.addEventListener('click', function() {
      Context.clearRect(0, 0, Canvas.width, Canvas.height);
      Restore_Array.push(Context.getImageData(0, 0, Canvas.width, Canvas.height));
      Index += 1;
    }, false);

    let count = 0;
    Color_Options_DropDown.addEventListener('click', function() {
        count++;
        if(count % 2 !== 0){
          Color_Options_Id.style.display = 'flex';
        }
        else{
          Color_Options_Id.style.display = 'none';
        }
    });

    
    All_Color_Options.forEach(arg1 => {
      arg1.addEventListener("click", () => {
        Color_Options_Id.style.display = 'none';
        ColorMain_Id.style.display = "none";
      });
  });

  let LastUsedColor = "Black";
  let GeneralColor = "Black";

  document.querySelector(".color1").addEventListener("click", () => {
      GeneralColor = "Black";
      LastUsedColor = "Black";
      ColorSvg_Id.style.color = "Black";
  });
  document.querySelector(".color2").addEventListener("click", () => {
      GeneralColor = "Red";
      LastUsedColor = "Red";
      ColorSvg_Id.style.color = "Red";
  });
  document.querySelector(".color3").addEventListener("click", () => {
      GeneralColor = "Yellow";
      LastUsedColor = "Yellow";
      ColorSvg_Id.style.color = "#cbcb00";
  });
  document.querySelector(".color4").addEventListener("click", () => {
      GeneralColor = "Green";
      LastUsedColor = "Green";
      ColorSvg_Id.style.color = "Green";
  });
  document.querySelector(".color5").addEventListener("click", () => {
      GeneralColor = "Blue";
      LastUsedColor = "Blue";
      ColorSvg_Id.style.color = "Blue";
  });
    
    let count1 = 0;
    Stroke_Size_DropDown.addEventListener('click', function(){
        count1++;
        if(count1 % 2 !== 0){
          Size_Options_Id.style.display = 'flex';
        }
        else{
          Size_Options_Id.style.display = 'none';
        }
    });


    All_Sizes_Options.forEach(arg1 => {
        arg1.addEventListener("click", () => {
          Size_Options_Id.style.display = 'none';
        });
    });

    let GeneralLineWidth = 10;
    document.querySelector(".size1").addEventListener("click", () => {
      GeneralLineWidth = 2;
    });
    document.querySelector(".size2").addEventListener("click", () => {
      GeneralLineWidth = 4;
    });
    document.querySelector(".size3").addEventListener("click", () => {
      GeneralLineWidth = 6;
    });
    document.querySelector(".size4").addEventListener("click", () => {
      GeneralLineWidth = 8;
    });
    document.querySelector(".size5").addEventListener("click", () => {
      GeneralLineWidth = 10;
    });
    document.querySelector(".size6").addEventListener("click", () => {
      GeneralLineWidth = 12;
    });
    document.querySelector(".size7").addEventListener("click", () => {
      GeneralLineWidth = 14;
    });
    document.querySelector(".size8").addEventListener("click", () => {
      GeneralLineWidth = 16;
    });
    document.querySelector(".size9").addEventListener("click", () => {
      GeneralLineWidth = 18;
    });
    document.querySelector(".size10").addEventListener("click", () => {
      GeneralLineWidth = 20;
    });



    let Count4 = 0;
    MoreLineSize.addEventListener("click", () => {
      Count4++;
      if (Count4 % 2 !== 0) {
        SizeConfig_Id.style.display = "block";
      }
      else{
        SizeConfig_Id.style.display = "none";
      }
    });
    let SizeConfig = document.querySelector(".SizeInput");

    SizeConfig.addEventListener("keydown", (e) => {
            if ( e.keyCode == 13 ) {
              GeneralLineWidth = SizeConfig.value;

                MoreLineSize.innerText = `(${GeneralLineWidth})`
                SizeConfig.value = "";
            }
    });
          




    Paint_Canvas_Drawing.addEventListener("click", () => {
      GeneralColor = LastUsedColor;
    });


    Brush_Id.style.display = "block";

    document.body.addEventListener("mousemove", (event) => {
      Brush_Id.style.top =  event.clientY - 20 + "px";
      Brush_Id.style.left = event.clientX + 3 + "px";
    });

    Paint_Canvas_Drawing.addEventListener("click", () => {
      Brush_Id.style.display = "block";
      Eraser_Id.style.display = "none";
      ZoomInLogoFollow_Id.style.display = "none";
      ZoomOutLogoFollow_Id.style.display = "none";
    });

    Erase_Canvas_Drawing.addEventListener("click", () => {
      Brush_Id.style.display = "none";
      Eraser_Id.style.display = "block";
      ZoomInLogoFollow_Id.style.display = "none";
      ZoomOutLogoFollow_Id.style.display = "none";

      document.body.addEventListener("mousemove", (event) => {
        Eraser_Id.style.top =  event.clientY - 20 + "px";
        Eraser_Id.style.left = event.clientX + 3 + "px";
      });
    });



    let Count5 = 0;
    ZoomInOut.addEventListener("click", () => {
      Count5++;
      Brush_Id.style.display = "none";
      Eraser_Id.style.display = "none";

        Canvas.removeEventListener("mousedown", ModePaintTrue, false);
        Canvas.removeEventListener("mouseup", ModePaintFalse, false);
        Canvas.removeEventListener("mousemove", ModeDraw, false);

      if (Count5 % 2 !== 0) {
        let ZoomSvg1 = document.createElement("i");
        ZoomSvg1.classList.add("bi");
        ZoomSvg1.classList.add("bi-zoom-out")
        ZoomSvg1.classList.add("ZoomOutLogo")

        ZoomInLogoFollow_Id.style.display = "block";
        ZoomOutLogoFollow_Id.style.display = "none";

        document.body.addEventListener("mousemove", (event) => {
          ZoomInLogoFollow_Id.style.top =  event.clientY - 20 + "px";
          ZoomInLogoFollow_Id.style.left = event.clientX + 3 + "px";
        });

        ZoomInOut.innerHTML = "";
        ZoomInOut.append(ZoomSvg1);
      }
      else{
        let ZoomSvg2 = document.createElement("i");
        ZoomSvg2.classList.add("bi");
        ZoomSvg2.classList.add("bi-zoom-in");
        ZoomSvg2.classList.add("ZoomInLogo");

        ZoomInOut.innerHTML = "";
        ZoomInOut.append(ZoomSvg2);

        ZoomOutLogoFollow_Id.style.display = "block";
        ZoomInLogoFollow_Id.style.display = "none";
        
        document.body.addEventListener("mousemove", (event) => {
          ZoomOutLogoFollow_Id.style.top =  event.clientY - 20 + "px";
          ZoomOutLogoFollow_Id.style.left = event.clientX + 3 + "px";
        });

      }
    });

    let Count6 = 0;
    document.querySelector(".Shapes").addEventListener("click", () => {
      Count6++;

      if (Count6 % 2 !== 0) {
        ShapesDivId.style.display = "flex";
      }
      else{
        ShapesDivId.style.display = "none";
      }
    });

    let Squear = document.querySelector(".Squear");
    let Triangle = document.querySelector(".Triangle");
    let Circle = document.querySelector(".Circle");

    let Settings = document.querySelector(".Settings");
    let Settings_Id = document.getElementById("Settings_Id");
    let Settings_Toggler = document.querySelector(".Settings_Toggler");
    let Settings_Toggler_Id = document.getElementById("Settings_Toggler_Id");


    Settings_Id.style.transform = "translate(-100%)";
    Settings_Toggler_Id.style.left = "0px";
    Settings_Toggler_Id.style.transform = "translate(0%)";

    let Count8 = 0;
    Settings_Toggler.addEventListener("click", () => {
      Count8++;

      let Settings_Gear_Id = document.getElementById("Settings_Gear_Id");

      if(Count8 % 2 !== 0){
        Settings_Id.style.transform = "translate(0%)";
        Settings_Id.style.transition = "all 0.5s";
        
        Settings_Toggler_Id.style.left = "210px";
        Settings_Toggler_Id.style.transition = "all 0.5s";

        Settings_Gear_Id.style.transform = "rotate(360deg)";
        Settings_Gear_Id.style.transition = "all 0.5s";
      }
      else{
        Settings_Id.style.transform = "translate(-100%)";
        Settings_Id.style.transition = "all 0.5s";

        Settings_Toggler_Id.style.left = "0px";
        Settings_Toggler_Id.style.transition = "all 0.5s";

        Settings_Gear_Id.style.transform = "rotate(-360deg)";
        Settings_Gear_Id.style.transition = "all 0.5s";
      }
    });

    let Setting1 = document.querySelector(".Setting1");
    let Setting2 = document.querySelector(".Setting2");
    let Setting3 = document.querySelector(".Setting3");
    let Setting4 = document.querySelector(".Setting4");
    let Setting5 = document.querySelector(".Setting5");
    let Setting6 = document.querySelector(".Setting6");
    let Setting7 = document.querySelector(".Setting7");
    let Setting8 = document.querySelector(".Setting8");
    let Setting9 = document.querySelector(".Setting9");


    let Click9 = 0;
    Setting7.addEventListener("click", () => {
      Click9++;

      let LangugeENG = document.createElement("button");
      LangugeENG.classList.add("Language1");
      LangugeENG.classList.add("Languages");
      LangugeENG.innerText = ("ENG");

      let LangaugeRUS = document.createElement("button");
      LangaugeRUS.classList.add("Language2");
      LangaugeRUS.classList.add("Languages");
      LangaugeRUS.innerText = ("RUS");

      let LangugeGEO = document.createElement("button");
      LangugeGEO.classList.add("Language3");
      LangugeGEO.classList.add("Languages");
      LangugeGEO.innerText = ("GEO");

      if (Click9 % 2 !== 0) {
        Setting7.innerText = " ";
        Setting7.append(LangugeENG);
        Setting7.append(LangaugeRUS);
        Setting7.append(LangugeGEO);
      }

      let DefaultLanguage = "ENG";
      LangugeGEO.addEventListener("click", () => {
        let Setting_Option = document.querySelectorAll(".Setting_Option");
        Setting_Option.forEach(i => {
          i.style.fontFamily = "chubbyGeorgian";
        });

        Setting1.innerText = "მორგება";
        Setting2.innerText = "უკანა ფონი";
        Setting3.innerText = "დახმარება";
        Setting4.innerText = "ავტორიზირება";
        Setting5.innerText = "დარეგისტრირება";
        Setting6.innerText = "ისტორია";
        Setting7.innerText = "ენები";
        Setting8.innerText = "სურათის ჩამოტვირთვა";

        localStorage.setItem("Language","GEO");
      });
      LangaugeRUS.addEventListener("click", () => {
        let Setting_Option = document.querySelectorAll(".Setting_Option");
        Setting_Option.forEach(i => {
          i.style.fontFamily = "chubbyRussian";
        });

        Setting1.innerText = "Настроить";
        Setting2.innerText = "Фон";
        Setting3.innerText = "Помощь";
        Setting4.innerText = "Авторизоваться";
        Setting5.innerText = "Зарегистрироваться";
        Setting6.innerText = "История";
        Setting7.innerText = "Язык";
        Setting8.innerText = "Скачать изображение";

        localStorage.setItem("Language","RUS");
      });
      LangugeENG.addEventListener("click", () => {
        let Setting_Option = document.querySelectorAll(".Setting_Option");
        Setting_Option.forEach(i => {
          i.style.fontFamily = "chubby";
        });

        Setting1.innerText = "Customize";
        Setting2.innerText = "Background";
        Setting3.innerText = "Help";
        Setting4.innerText = "Log In";
        Setting5.innerText = "Sign Up";
        Setting6.innerText = "History";
        Setting7.innerText = "Langauge";
        Setting8.innerText = "Download image";

        localStorage.setItem("Language","ENG");
      });
    });






    let Backgrounds_TogglerBtn = document.querySelector(".Backgrounds_TogglerBtn");
    let Backgrounds_outter_Id = document.getElementById("Backgrounds_outter_Id");
    let Settings_Backgrounds_Toggler = document.querySelector(".Settings_Backgrounds_Toggler");
    Backgrounds_outter_Id.style.transform = "translateX(-100%)";

    Setting2.addEventListener("click", () => {
      Backgrounds_outter_Id.style.transform = "translateX(0%)";
      Backgrounds_outter_Id.style.transition = "all 0.5s";

      Settings_Id.style.transform = "translate(-100%)";
      Settings_Id.style.transition = "all 0.5s";

      Settings_Toggler_Id.style.left = "0px";
      Settings_Toggler_Id.style.transform = "translate(-100%)";
      Settings_Toggler_Id.style.transition = "all 0.5s";
    });

    Settings_Backgrounds_Toggler.addEventListener("click", () => {
      Backgrounds_outter_Id.style.transform = "translateX(-100%)";
      Backgrounds_outter_Id.style.transition = "all 0.5s";

      Settings_Id.style.transform = "translate(0%)";
      Settings_Id.style.transition = "all 0.5s";

      Settings_Toggler_Id.style.left = "210px";
      Settings_Toggler_Id.style.transform = "translate(0%)";
      Settings_Toggler_Id.style.transition = "all 0.5s";
    });

    let Bc1 = document.querySelector(".Bc1");
    let Bc2 = document.querySelector(".Bc2");
    let Bc3 = document.querySelector(".Bc3");
    let Bc4 = document.querySelector(".Bc4");
    let Bc5 = document.querySelector(".Bc5");
    let Bc6 = document.querySelector(".Bc6");
    let Bc7 = document.querySelector(".Bc7");
    let Bc8 = document.querySelector(".Bc8");

    let image_link_textarea = document.querySelector(".image_link_textarea");
    let subbmit_image_link = document.querySelector(".subbmit_image_link");
    let Costume_Background_Id = document.getElementById("Costume_Background_Id");


    subbmit_image_link.addEventListener("click", () => {
      if (image_link_textarea.value.includes("http://") || image_link_textarea.value.includes("https://")) {
        localStorage.setItem("cstImage",`url('${image_link_textarea.value}')`);
        alert("Background added in :\nSettings --> Backgrounds --> Costume"); 
        Costume_Background_Id.style.backgroundImage = localStorage.getItem("cstImage");
        Canvas.style.backgroundImage = localStorage.getItem("cstImage");
      }
    });



    Costume_Background_Id.style.backgroundImage = localStorage.getItem("cstImage");

    Bc1.addEventListener("click", () => {
      Canvas.style.backgroundImage = "url('')";
      Canvas.style.backgroundColor = "white";
      localStorage.setItem("Background","White");
    });

    Bc2.addEventListener("click", () => {
      Canvas.style.backgroundImage = "url('')";
      Canvas.style.backgroundColor = "#ececec";
      localStorage.setItem("Background","Grey");
    });

    Bc3.addEventListener("click", () => {
      Canvas.style.backgroundImage = "url('')";
      Canvas.style.backgroundColor = "#CAE7DF";
      localStorage.setItem("Background","GreenishBlue");
    });

    Bc4.addEventListener("click", () => {
      Canvas.style.backgroundImage = "url('')";
      Canvas.style.backgroundColor = "azure";
      localStorage.setItem("Background","Azure");
    });

    Bc5.addEventListener("click", () => {
      Canvas.style.backgroundImage = "url('')";
      Canvas.style.backgroundColor = "#ffe7e7";
      localStorage.setItem("Background","SkinColor");
    });

    Bc6.addEventListener("click", () => {
      Canvas.style.backgroundImage = "url('images/OldPaper.png')";
      Canvas.style.backgroundColor = " ";
      localStorage.setItem("Background","OldPaper");
    });

    Bc7.addEventListener("click", () => {
      Canvas.style.backgroundImage = "url('images/Screenshot\ 2022-05-31\ 203037.png')";
      Canvas.style.backgroundColor = " ";
      localStorage.setItem("Background","MathPaper");
    });
    Bc8.addEventListener("click", () => {
      Canvas.style.backgroundImage = localStorage.getItem("cstImage");
      Canvas.style.backgroundColor = " ";
      localStorage.setItem("Background","CostumeImage");
    });
    

    let allBackgrounds = document.querySelectorAll("Background");

    switch (localStorage.getItem("Background")) {
      case "White":
        Canvas.style.backgroundImage = "url('')";
        Canvas.style.backgroundColor = "white";
        break;
        case "Grey":
          Canvas.style.backgroundImage = "url('')";
          Canvas.style.backgroundColor = "#ececec";
          break;
          case "GreenishBlue":
            Canvas.style.backgroundImage = "url('')";
            Canvas.style.backgroundColor = "#CAE7DF";
            break;
            case "Azure":
              Canvas.style.backgroundImage = "url('')";
              Canvas.style.backgroundColor = "azure";
              break;
              case "SkinColor":
                Canvas.style.backgroundImage = "url('')";
                Canvas.style.backgroundColor = "#ffe7e7";
                break;
                case "OldPaper":
                  Canvas.style.backgroundImage = "url('images/OldPaper.png')";
                  Canvas.style.backgroundColor = " ";
                  break;
                  case "MathPaper":
                    Canvas.style.backgroundImage = "url('images/Screenshot\ 2022-05-31\ 203037.png')";
                    Canvas.style.backgroundColor = " ";
                    break;
                    case "CostumeImage":
                      Canvas.style.backgroundImage = localStorage.getItem("cstImage");
                      Costume_Background_Id.style.backgroundImage = localStorage.getItem("cstImage");
                      Canvas.style.backgroundColor = " ";

      default:
        Canvas.style.backgroundImage = "url('')";
        Canvas.style.backgroundColor = "white";
        break;
    }


    let SignUp = document.querySelector(".SignUp");
    let SignUpOutter = document.getElementById("SignUpOutter");
    let exit_SignUp = document.querySelector(".exit_SignUp");

    SignUpOutter.style.transform = "translate(-100%)";

    Setting5.addEventListener("click", () => {
      SignUpOutter.style.transition = "1s";
      SignUpOutter.style.transform = "translate(0%)";

      Settings_Id.style.transform = "translate(-100%)";
      Settings_Id.style.transition = "all 1s";
      
      Settings_Toggler_Id.style.left = "0px";
      Settings_Toggler_Id.style.transition = "all 1s";
    });

    exit_SignUp.addEventListener("click", () => {
      SignUpOutter.style.transition = "1s";
      SignUpOutter.style.transform = "translate(-100%)";

      Settings_Id.style.transform = "translate(0%)";
      Settings_Id.style.transition = "all 1s";
      
      Settings_Toggler_Id.style.left = "210px";
      Settings_Toggler_Id.style.transition = "all 1s";
    });



    let DownloadImage_Choice_Id = document.getElementById("DownloadImage_Choice_Id");
    let Download_button = document.querySelector(".Download_button");

    DownloadImage_Choice_Id.style.display = "none";

    Download_button.addEventListener("click", () => {
      DownloadImage_Choice_Id.style.display = "flex";
    });

    let Download_Yes = document.querySelector(".Download_Yes");

    Download_Yes.addEventListener("click", () => {
          function download() {
      const image = Canvas.toDataURL();
      const link = document.createElement("a");
      link.href = image;
      link.download = "2DRAW.png";
      link.click();

      Context.putImageData(Restore_Array[Index],0,0)
    }


         download();
         DownloadImage_Choice_Id.style.display = "none";
    });

    document.querySelector(".Download_No").addEventListener("click", () => {
      DownloadImage_Choice_Id.style.display = "none";
    });






   

    
    // 2.









    let submit = document.querySelector(".submit");

    submit.addEventListener("click", () => {
      let name = document.querySelector(".name");
      let lastname = document.querySelector(".lastname");
      let email = document.querySelector(".email");
      let password = document.querySelector(".password");
      let phonenumber = document.querySelector(".phonenumber");

      let rnd1 = Math.floor(Math.random() * 9) + 1;
      let rnd2 = Math.floor(Math.random() * 9) + 1;
      let rnd3 = Math.floor(Math.random() * 9) + 1;
      let rnd4 = Math.floor(Math.random() * 9) + 1;
      let rnd5 = Math.floor(Math.random() * 9) + 1;
      let rnd6 = Math.floor(Math.random() * 9) + 1;
      let UHC = `${rnd1}${rnd2}${rnd3}${rnd4}${rnd5}${rnd6}`;
      console.log(UHC);

      alert("Your verification code: " + UHC);

      SignUp_Id.innerHTML = "";

      let verifyP = document.createElement("p");
      verifyP.classList.add("verifyP");
      verifyP.innerText = "Type verification code";

      let verifyInput = document.createElement("input");
      verifyInput.classList.add("SignUp_Inputs");
      verifyInput.classList.add("Verify_Input");
      verifyInput.placeholder = "Press enter to submit...";

      let resenfCode = document.createElement("button");
      resenfCode.classList.add("resendCode");
      resenfCode.innerText = "Resend Code";

      SignUp_Id.append(verifyP);
      SignUp_Id.append(verifyInput);
      SignUp_Id.append(resenfCode);

      let resenfCode_button = document.querySelector(".resendCode");
      let Verify_Input = document.querySelector(".Verify_Input");

      let Attempts = 0;
      resenfCode_button.addEventListener("click", () => {
        Attempts++;

        rnd1 = Math.floor(Math.random() * 9) + 1;
        rnd2 = Math.floor(Math.random() * 9) + 1;
        rnd3 = Math.floor(Math.random() * 9) + 1;
        rnd4 = Math.floor(Math.random() * 9) + 1;
        rnd5 = Math.floor(Math.random() * 9) + 1;
        rnd6 = Math.floor(Math.random() * 9) + 1;
        UHC = `${rnd1}${rnd2}${rnd3}${rnd4}${rnd5}${rnd6}`;
        console.log(UHC);
  
        alert("Your verification code: " + UHC);

        if (Attempts == 5) {
          alert("Are you having trouble?\n Contact me on Gmail -- baratashvilinick@gmail.com");
          Attempts = 0;
        }
      });

      let Count9 = 0;
      Verify_Input.addEventListener("keydown", (e) => {
        if (e.keyCode == 13) {
          if (verifyInput.value == UHC) {
            console.log("event went");
            localStorage.setItem("Name",name.value);
            localStorage.setItem("Lastname",lastname.value);
            localStorage.setItem("Email",email.value);
            localStorage.setItem("Password",password.value);
            localStorage.setItem("Phonenumber",phonenumber.value);
  
            verifyInput.value = "";
  
            let Verified = document.createElement("div");
            Verified.classList.add("verified_div");
            let Verified_I = document.createElement("i");
            Verified_I.classList.add("bi");
            Verified_I.classList.add("bi-check-circle");
            Verified_I.classList.add("Verified_I_My");
            Verified.append(Verified_I);
  
            SignUp_Id.innerHTML = "";
            SignUp_Id.append(Verified);
          }
          else if(verifyInput.value !== UHC){
            verifyInput.value = "";
            
            let NotVerified_P = document.createElement("p");
            NotVerified_P.classList.add("NotVerified_P");
            NotVerified_P.innerText = "Incorrect code";
  
            SignUp_Id.append(NotVerified_P);
            Count9++;
  
            if (Count9 == 10) {
              Count9 = 0;
              SignUp_Id.innerHTML = " ";
              SignUp_Id.append(verifyP);
              SignUp_Id.append(verifyInput);
            }
          }
        }
      });
    });

    // let Line = document.querySelector(".Line");
    // let count11 = 0;

    // Line.addEventListener("click", () => {
    //     Canvas.addEventListener("click", (e) => {
    //       count11++;
    //       Context.lineCap = "round";
    //       if (count11 % 2 !== 0) {
    //         Context.beginPath();
    //         Context.moveTo(e.clientX, e.clientY);
    //       }
    //       else{
    //         Context.moveTo(e.clientX, e.clientY);
    //         Context.beginPath();
    //       }
    //       Context.stroke();
  
    //       console.log(`x : ${e.clientX}, y : ${e.clientY}`);
    //     });
    // });
    // here line


    let Customize_toggler = document.querySelector(".Customize_toggler");

    let Customize_toggler_Id = document.getElementById("Customize_toggler_Id");

    let outter_costumize_Id = document.getElementById("outter_costumize_Id");

    let Setting1_Id = document.getElementById("Setting1_Id");

    outter_costumize_Id.style.transform = "translateX(-100%)";
    outter_costumize_Id.style.transition = "1s";

    Setting1_Id.addEventListener("click", () => {
      Settings_Id.style.transform = "translate(-100%)";
      Settings_Id.style.transition = "all 1s";
      
      Settings_Toggler_Id.style.left = "0";
      Settings_Toggler_Id.style.transition = "all 1s";

      outter_costumize_Id.style.transform = "translateX(0%)";
      outter_costumize_Id.style.transition = "1s";
    });

    Customize_toggler_Id.addEventListener("click", () => {
      Settings_Id.style.transform = "translate(0%)";
      Settings_Id.style.transition = "all 1s";
      
      Settings_Toggler_Id.style.left = "210px";
      Settings_Toggler_Id.style.transition = "all 1s";

      outter_costumize_Id.style.transform = "translateX(-100%)";
      outter_costumize_Id.style.transition = "2s";
    });


    let customize_colors_Id = document.getElementById("customize_colors_Id");
    let costumize_optionsAll = document.querySelectorAll(".costumize_options");

    let editColors_outter_Id = document.getElementById("editColors_outter_Id");
    editColors_outter_Id.style.transform = "translateX(-100%)";
    editColors_outter_Id.style.transition = "1s";

    costumize_optionsAll.forEach(optionClicked => {
      optionClicked.addEventListener("click", () => {
        outter_costumize_Id.style.transform = "translateX(-100%)";
        outter_costumize_Id.style.transition = "2s";
      });
    });

    customize_colors_Id.addEventListener("click", () => {
      editColors_outter_Id.style.transform = "translateX(0%)";
      editColors_outter_Id.style.transition = "1s";
    });


    let edit_color_one = document.querySelector(".edit_color_one");
    let edit_color_two = document.querySelector(".edit_color_two");
    let edit_color_three = document.querySelector(".edit_color_three");
    let edit_color_four = document.querySelector(".edit_color_four");
    let edit_color_five = document.querySelector(".edit_color_five");


    localStorage.setItem("DefaultColorOne","black");
    localStorage.setItem("DefaultColorTwo","red");
    localStorage.setItem("DefaultColorThree","yellow");
    localStorage.setItem("DefaultColorFour","green");
    localStorage.setItem("DefaultColorFive","blue");

    let ChangedColor;

    let colorIndicatorEditor = document.getElementById("color-indicator-editor");
    let colorIndicatorEditor1 = document.getElementById("color-indicator-editor1");
    let colorIndicatorEditor2 = document.getElementById("color-indicator-editor2");
    let colorIndicatorEditor3 = document.getElementById("color-indicator-editor3");
    let colorIndicatorEditor4 = document.getElementById("color-indicator-editor4");

    const colorPickerEditor = new iro.ColorPicker("#color-picker-editor", {
        width: 180, color: "#fff"
    });
    colorPickerEditor.on('color:change', function (color) {
      colorIndicatorEditor.style.backgroundColor = color.hexString;
      colorIndicatorEditor1.style.backgroundColor = color.hexString;
      colorIndicatorEditor2.style.backgroundColor = color.hexString;
      colorIndicatorEditor3.style.backgroundColor = color.hexString;
      colorIndicatorEditor4.style.backgroundColor = color.hexString;

      ChangedColor = color.hexString;
      colorIndicatorEditor.innerHTML = color.hexString + "\nClick to change color";
      colorIndicatorEditor1.innerHTML = color.hexString + "\nClick to change color";
      colorIndicatorEditor2.innerHTML = color.hexString + "\nClick to change color";
      colorIndicatorEditor3.innerHTML = color.hexString + "\nClick to change color";
      colorIndicatorEditor4.innerHTML = color.hexString + "\nClick to change color";
    });



    let colorChanged1;
    let colorChanged2;
    let colorChanged3;
    let colorChanged4;
    let colorChanged5;

    let countCep1 = 0;
    edit_color_one.addEventListener("click", () => {
      colorIndicatorEditor.style.display = "inline";
      colorIndicatorEditor1.style.display = "none";
      colorIndicatorEditor2.style.display = "none";
      colorIndicatorEditor3.style.display = "none";
      colorIndicatorEditor4.style.display = "none";


      colorIndicatorEditor.addEventListener("click", () => {
          console.log(ChangedColor);
          document.getElementById("color_display1_Id").style.backgroundColor = ChangedColor;

          colorChanged1 = document.getElementById("color_display1_Id").style.backgroundColor;

          localStorage.setItem("editedColorOne",ChangedColor)

          document.getElementById("color1_Id").style.backgroundColor = localStorage.getItem("editedColorOne");
          GeneralColor = localStorage.getItem("editedColorOne");
          LastUsedColor = localStorage.getItem("editedColorOne");

          document.querySelector(".color1").addEventListener("click", () => {
            GeneralColor = colorChanged1;
            LastUsedColor = colorChanged1;
            ColorSvg_Id.style.color = colorChanged1;
        });
      });

      countCep1++;
      document.querySelector('.cep1').innerText = "Editing...";
      document.querySelector('.cep2').innerText = "Edit Color";
      document.querySelector('.cep3').innerText = "Edit Color";
      document.querySelector('.cep4').innerText = "Edit Color";
      document.querySelector('.cep5').innerText = "Edit Color";

      let ColorEditGrid_Id = document.getElementById('ColorEditGrid_Id');
      ColorEditGrid_Id.style.display = "flex";
      

      if (countCep1 == 2) {
        document.querySelector('.cep1').innerText = "Edit Color";
        let ColorEditGrid_Id = document.getElementById('ColorEditGrid_Id');
        ColorEditGrid_Id.style.display = "none";
        countCep1 = 0;
      }

      document.getElementById("reset1").addEventListener("click", () => {
        GeneralColor = "black";
        LastUsedColor = "black";
        document.getElementById("color_display1_Id").style.backgroundColor = "black";
        document.getElementById("color1_Id").style.backgroundColor = "black";
        colorChanged1 = "black";
      });
    });





    let countCep2 = 0;
    edit_color_two.addEventListener("click", () => {

      colorIndicatorEditor.style.display = "none";
      colorIndicatorEditor1.style.display = "inline";
      colorIndicatorEditor2.style.display = "none";
      colorIndicatorEditor3.style.display = "none";
      colorIndicatorEditor4.style.display = "none";


      colorIndicatorEditor1.addEventListener("click", () => {
          console.log(ChangedColor);
          document.getElementById("color_display2_Id").style.backgroundColor = ChangedColor;
          localStorage.setItem("editedColorTwo",ChangedColor)

          colorChanged2 = document.getElementById("color_display2_Id").style.backgroundColor;

          document.getElementById("color2_Id").style.backgroundColor = localStorage.getItem("editedColorTwo");
          GeneralColor = localStorage.getItem("editedColorTwo");
          LastUsedColor = localStorage.getItem("editedColorTwo");

          document.querySelector(".color2").addEventListener("click", () => {
            GeneralColor = colorChanged2;
            LastUsedColor = colorChanged2;
            ColorSvg_Id.style.color = colorChanged2;
        });
      });


      countCep2++;
      document.querySelector('.cep1').innerText = "Edit Color";
      document.querySelector('.cep2').innerText = "Editing...";
      document.querySelector('.cep3').innerText = "Edit Color";
      document.querySelector('.cep4').innerText = "Edit Color";
      document.querySelector('.cep5').innerText = "Edit Color";

      let ColorEditGrid_Id = document.getElementById('ColorEditGrid_Id');
      ColorEditGrid_Id.style.display = "flex";

      if (countCep2 == 2) {
        document.querySelector('.cep2').innerText = "Edit Color";
        let ColorEditGrid_Id = document.getElementById('ColorEditGrid_Id');
        ColorEditGrid_Id.style.display = "none";
        countCep2 = 0;
      }

      document.getElementById("reset2").addEventListener("click", () => {
        GeneralColor = "red";
        LastUsedColor = "red";
        document.getElementById("color_display2_Id").style.backgroundColor = "red";
        document.getElementById("color2_Id").style.backgroundColor = "red";

        colorChanged2 = "red";
      });
    });



    let countCep3 = 0;
    edit_color_three.addEventListener("click", () => {

      colorIndicatorEditor.style.display = "none";
      colorIndicatorEditor1.style.display = "none";
      colorIndicatorEditor2.style.display = "inline";
      colorIndicatorEditor3.style.display = "none";
      colorIndicatorEditor4.style.display = "none";


      colorIndicatorEditor2.addEventListener("click", () => {
          console.log(ChangedColor);
          document.getElementById("color_display3_Id").style.backgroundColor = ChangedColor;
          localStorage.setItem("editedColorThree",ChangedColor)

          colorChanged3 = document.getElementById("color_display3_Id").style.backgroundColor;
          console.log(colorChanged3);

          document.getElementById("color3_Id").style.backgroundColor = localStorage.getItem("editedColorThree");
          GeneralColor = localStorage.getItem("editedColorThree");
          LastUsedColor = localStorage.getItem("editedColorThree");


          document.querySelector(".color3").addEventListener("click", () => {
            GeneralColor = colorChanged3;
            LastUsedColor = colorChanged3;
            ColorSvg_Id.style.color = colorChanged3;
        });
      });

      countCep3++;
      document.querySelector('.cep1').innerText = "Edit Color";
      document.querySelector('.cep2').innerText = "Edit Color";
      document.querySelector('.cep3').innerText = "Editing...";
      document.querySelector('.cep4').innerText = "Edit Color";
      document.querySelector('.cep5').innerText = "Edit Color";

      let ColorEditGrid_Id = document.getElementById('ColorEditGrid_Id');
      ColorEditGrid_Id.style.display = "flex";

      if (countCep3 == 2) {
        document.querySelector('.cep3').innerText = "Edit Color";
        let ColorEditGrid_Id = document.getElementById('ColorEditGrid_Id');
        ColorEditGrid_Id.style.display = "none";
        countCep3 = 0;
      }

      document.getElementById("reset3").addEventListener("click", () => {
        GeneralColor = "yellow";
        LastUsedColor = "yellow";
        document.getElementById("color_display3_Id").style.backgroundColor = "yellow";
        document.getElementById("color3_Id").style.backgroundColor = "yellow";

        colorChanged3 = "yellow";
      });
    });




    let countCep4 = 0;
    edit_color_four.addEventListener("click", () => {

      colorIndicatorEditor.style.display = "none";
      colorIndicatorEditor1.style.display = "none";
      colorIndicatorEditor2.style.display = "none";
      colorIndicatorEditor3.style.display = "inline";
      colorIndicatorEditor4.style.display = "none";


      colorIndicatorEditor3.addEventListener("click", () => {
          console.log(ChangedColor);
          document.getElementById("color_display4_Id").style.backgroundColor = ChangedColor;
          localStorage.setItem("editedColorFour",ChangedColor)

          colorChanged4 = document.getElementById("color_display4_Id").style.backgroundColor;

          document.getElementById("color4_Id").style.backgroundColor = localStorage.getItem("editedColorFour");
          GeneralColor = localStorage.getItem("editedColorFour");
          LastUsedColor = localStorage.getItem("editedColorFour");

          document.querySelector(".color4").addEventListener("click", () => {
            GeneralColor = colorChanged4;
            LastUsedColor = colorChanged4;
            ColorSvg_Id.style.color = colorChanged4;
        });
      });

      countCep4++;
      document.querySelector('.cep1').innerText = "Edit Color";
      document.querySelector('.cep2').innerText = "Edit Color";
      document.querySelector('.cep3').innerText = "Edit Color";
      document.querySelector('.cep4').innerText = "Editing...";
      document.querySelector('.cep5').innerText = "Edit Color";

      let ColorEditGrid_Id = document.getElementById('ColorEditGrid_Id');
      ColorEditGrid_Id.style.display = "flex";

      if (countCep4 == 2) {
        document.querySelector('.cep4').innerText = "Edit Color";
        let ColorEditGrid_Id = document.getElementById('ColorEditGrid_Id');
        ColorEditGrid_Id.style.display = "none";
        countCep4 = 0;
      }

      document.getElementById("reset4").addEventListener("click", () => {
        GeneralColor = "green";
        LastUsedColor = "green";
        document.getElementById("color_display4_Id").style.backgroundColor = "green";
        document.getElementById("color4_Id").style.backgroundColor = "green";

        colorChanged4 = "green";
      });
    });




    let countCep5 = 0;
    edit_color_five.addEventListener("click", () => {

      colorIndicatorEditor.style.display = "none";
      colorIndicatorEditor1.style.display = "none";
      colorIndicatorEditor2.style.display = "none";
      colorIndicatorEditor3.style.display = "none";
      colorIndicatorEditor4.style.display = "inline";


      colorIndicatorEditor4.addEventListener("click", () => {
          console.log(ChangedColor);
          document.getElementById("color_display5_Id").style.backgroundColor = ChangedColor;
          localStorage.setItem("editedColorFive",ChangedColor)

          colorChanged5 = document.getElementById("color_display5_Id").style.backgroundColor;

          document.getElementById("color5_Id").style.backgroundColor = localStorage.getItem("editedColorFive");
          GeneralColor = localStorage.getItem("editedColorFive");
          LastUsedColor = localStorage.getItem("editedColorFive");


          document.querySelector(".color5").addEventListener("click", () => {
            GeneralColor = colorChanged5;
            LastUsedColor = colorChanged5;
            ColorSvg_Id.style.color = colorChanged5;
        });
      
      });

      countCep5++;
      document.querySelector('.cep1').innerText = "Edit Color";
      document.querySelector('.cep2').innerText = "Edit Color";
      document.querySelector('.cep3').innerText = "Edit Color";
      document.querySelector('.cep4').innerText = "Edit Color";
      document.querySelector('.cep5').innerText = "Editing...";

      let ColorEditGrid_Id = document.getElementById('ColorEditGrid_Id');
      ColorEditGrid_Id.style.display = "flex";

      if (countCep5 == 2) {
        document.querySelector('.cep5').innerText = "Edit Color";
        let ColorEditGrid_Id = document.getElementById('ColorEditGrid_Id');
        ColorEditGrid_Id.style.display = "none";
        countCep5 = 0;
      }

      document.getElementById("reset5").addEventListener("click", () => {
        GeneralColor = "blue";
        LastUsedColor = "blue";
        document.getElementById("color_display5_Id").style.backgroundColor = "blue";
        document.getElementById("color5_Id").style.backgroundColor = "blue";

        colorChanged5 = "blue";
      });
    });




    let editColor_close = document.querySelector(".editColor_close");
    let ColorEditGrid_Id = document.getElementById('ColorEditGrid_Id');
    editColor_close.addEventListener("click", () => {
      editColors_outter_Id.style.transform = "translateX(-100%)";
      editColors_outter_Id.style.transition = "2s";

      outter_costumize_Id.style.transform = "translateX(0%)";
      outter_costumize_Id.style.transition = "1s";

      ColorEditGrid_Id.style.display = "none";

      countCep1 = 0;
      countCep2 = 0;
      countCep3 = 0;
      countCep4 = 0;
      countCep5 = 0; 

      document.querySelector('.cep1').innerText = "Edit Color";
      document.querySelector('.cep2').innerText = "Edit Color";
      document.querySelector('.cep3').innerText = "Edit Color";
      document.querySelector('.cep4').innerText = "Edit Color";
      document.querySelector('.cep5').innerText = "Edit Color";
    });



    let customize_background_outter_Id = document.getElementById("customize_background_outter_Id");
    let toggle_background_image = document.querySelector(".toggle_background_image");
    let customize_background_Id = document.getElementById("customize_background_Id");

    customize_background_outter_Id.style.transform = "translateX(-100%)";
    customize_background_outter_Id.style.transition = "1s";

    customize_background_Id.addEventListener("click", () => {
      customize_background_outter_Id.style.transform = "translateX(0%)";
    });

    toggle_background_image.addEventListener("click", () => {
      customize_background_outter_Id.style.transform = "translateX(-100%)";
      outter_costumize_Id.style.transform = "translateX(0%)";
      outter_costumize_Id.style.transition = "1s";
    });


    let editToolBar_outter_Id = document.getElementById("editToolBar_outter_Id");

    editToolBar_outter_Id.style.transform = "translateX(-100%)";
    editToolBar_outter_Id.style.transition = "1s";

    let customize_toolBar_Id = document.getElementById("customize_toolBar_Id");

    customize_toolBar_Id.addEventListener("click", () => {
      editToolBar_outter_Id.style.transform = "translateX(0%)";
    });

    let editToolBar_close = document.querySelector(".editToolBar_close");

    editToolBar_close.addEventListener("click", () => {
      editToolBar_outter_Id.style.transform = "translateX(-100%)";
      outter_costumize_Id.style.transform = "translateX(0%)";
      outter_costumize_Id.style.transition = "1s";
    });


    let Options_Id = document.getElementById("Options_Id");

    let tbc1 = document.querySelector(".tbc1");
    let tbc2 = document.querySelector(".tbc2");
    let tbc3 = document.querySelector(".tbc3");
    let tbc4 = document.querySelector(".tbc4");
    let tbc5 = document.querySelector(".tbc5");
    let tbc6 = document.querySelector(".tbc6");
    let tbc7 = document.querySelector(".tbc7");


    tbc1.addEventListener("click", () => {
      Options_Id.style.backgroundImage = "url('')";
      Options_Id.style.backgroundColor = "white";
      localStorage.setItem("BackgroundToolBar","White");
    });

    tbc2.addEventListener("click", () => {
      Options_Id.style.backgroundImage = "url('')";
      Options_Id.style.backgroundColor = "#ececec";
      localStorage.setItem("BackgroundToolBar","Grey");
    });

    tbc3.addEventListener("click", () => {
      Options_Id.style.backgroundImage = "url('')";
      Options_Id.style.backgroundColor = "#CAE7DF";
      localStorage.setItem("BackgroundToolBar","GreenishBlue");
    });

    tbc4.addEventListener("click", () => {
      Options_Id.style.backgroundImage = "url('')";
      Options_Id.style.backgroundColor = "azure";
      localStorage.setItem("BackgroundToolBar","Azure");
    });

    tbc5.addEventListener("click", () => {
      Options_Id.style.backgroundImage = "url('')";
      Options_Id.style.backgroundColor = "#ffe7e7";
      localStorage.setItem("BackgroundToolBar","SkinColor");
    });

    tbc6.addEventListener("click", () => {
      Options_Id.style.backgroundImage = "url('images/OldPaper.png')";
      Options_Id.style.backgroundColor = " ";
      localStorage.setItem("BackgroundToolBar","OldPaper");
    });

    tbc7.addEventListener("click", () => {
      Options_Id.style.backgroundImage = "url('images/Screenshot\ 2022-05-31\ 203037.png')";
      Options_Id.style.backgroundColor = " ";
      localStorage.setItem("BackgroundToolBar","MathPaper");
    });



    switch (localStorage.getItem("BackgroundToolBar")) {
      case "White":
        Options_Id.style.backgroundImage = "url('')";
        Options_Id.style.backgroundColor = "white";
        break;
        case "Grey":
          Options_Id.style.backgroundImage = "url('')";
          Options_Id.style.backgroundColor = "#ececec";
          break;
          case "GreenishBlue":
            Options_Id.style.backgroundImage = "url('')";
            Options_Id.style.backgroundColor = "#CAE7DF";
            break;
            case "Azure":
              Options_Id.style.backgroundImage = "url('')";
              Options_Id.style.backgroundColor = "azure";
              break;
              case "SkinColor":
                Options_Id.style.backgroundImage = "url('')";
                Options_Id.style.backgroundColor = "#ffe7e7";
                break;
                case "OldPaper":
                  Options_Id.style.backgroundImage = "url('images/OldPaper.png')";
                  Options_Id.style.backgroundColor = " ";
                  break;
                  case "MathPaper":
                    Options_Id.style.backgroundImage = "url('images/Screenshot\ 2022-05-31\ 203037.png')";
                    Options_Id.style.backgroundColor = " ";
                    break;
      default:
        Options_Id.style.backgroundImage = "url('')";
        Options_Id.style.backgroundColor = "white";
        break;
    }



    const reader = new FileReader();
    const img = new Image();
    
    // 3.
    const uploadImage = (e) => {
      reader.onload = () => {
        img.onload = () => {

          img.width = window.innerWidth;
          img.height = window.innerHeight -65;

          Context.drawImage(img, 0, 0);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    };
  
    // 4.
    const imageLoader = document.getElementById("Setting9_Id");
    imageLoader.addEventListener("change", uploadImage);


    // localStorage.clear(); //here storage clear
});
