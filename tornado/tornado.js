/* tornado
 * version: 1.0 (october 2015)
 * Copyright (c) 2015 disapp 
 * disappteam@gmail.com
 
 * Permission is hereby granted, free of charge, to any person
   obtaining a copy of this software and associated documentation
   files (the "Software"), to deal in the Software without
   restriction, including without limitation the rights to use,
   copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the
   Software is furnished to do so, subject to the following
   conditions:
   The above copyright notice and this permission notice shall be
   included in all copies or substantial portions of the Software.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
   OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
   HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
   WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
   FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
   OTHER DEALINGS IN THE SOFTWARE.
 */


var tornado = (function (document, window, $, undefined) {

    //**************************************************************************************
    var App = {
        options: {
           
        },
        tornados: {},
        index: 1,
        addtornado: function (element) {

           

            element.attr("id", "tornado-" + App.index)

            var element_topush = {};
            var toolbar = $('<div class="tornado-toolbar clearfix" id="tornado-toolbar' + App.index + '"><span class="tornado-logo" ></span><div class="tornado-tab clearfix"  data-id="' + element.attr('id') + '"><span class="view-option" style="display:none;">View</span><div class="tornado-container-mode" data-id="' + element.attr('id') + '"></div></div><div  class="tornado-button"><input type="button" class="tornado-toggle tornado-edit" value="edit this code" data-id="' + element.attr('id') + '" /></div>')
            var iframe_result = $('<iframe class="tornado-iframe" id="tornado-result-' + App.index + '"/>');

            

           

            element.prepend(toolbar);
            element.find('textarea').each(function () {
                toolbar.find(".tornado-container-mode").append("<a class='tornado-tab-selection' data-type='" + $(this).attr('class') + "' >" + $(this).attr('class') + "</a>")
            });

            var remove_jsfiddle = element.data("jsfiddle") == false;
            var remove_codepen = element.data("codepen") == false;
            var remove_savehtml = element.data("savehtml") == false;
           
          
          if (!remove_jsfiddle)
               {
                toolbar.find(".tornado-container-mode").append("<a class='tornado-jsfiddle'  data-id='" + element.attr('id') + "'>jsfiddle</a>")
           }
            if (!remove_codepen) {
                toolbar.find(".tornado-container-mode").append("<a class='tornado-codepen'  data-id='" + element.attr('id') + "'>code pen</a>")
            }


            if (btoa && !remove_savehtml) {
                toolbar.find(".tornado-container-mode").append("<a class='tornado-save-html' download='tornado.html'  data-id='" + element.attr('id') + "'>save as html</a>")
            }

            toolbar.find('a.tornado-tab-selection:first-child').addClass("tornado-tab-active");
          
           element.append(iframe_result);
           element_topush.iframe = "tornado-result-" + App.index;
           element_topush.toolbar = toolbar;
            var text_area_js =element.find('.javascript');

            if (text_area_js.length == 0) {
                text_area_js = $('<textarea id="tornado-textarea-js-' + App.index + '" class="javascript"></textarea>');
               element.append(text_area_js);
            }
            else {
                text_area_js.attr('id', 'tornado-textarea-js-' + App.index);
            }



            var text_area_html =element.find('.html');

            if (text_area_html.length == 0) {
                text_area_html = $('<textarea id="tornado-textarea-html-' + App.index + '" class="html"></textarea>');
               element.append(text_area_html);
            }
            else {
                text_area_html.attr('id', 'tornado-textarea-html-' + App.index);
            }
             var text_area_resources =element.find('.resources');

            if (text_area_resources.length == 0) {
                text_area_resources = $('<textarea id="tornado-textarea-res-' + App.index + '" class="resources"></textarea>');
               element.append(text_area_resources);
            }
            else {
                text_area_resources.attr('id', 'tornado-textarea-res-' + App.index);
            }

           
            var text_area_css =element.find('.css');
            if (text_area_css.length == 0) {
                text_area_css = $('<textarea id="tornado-textarea-css-' + App.index + '" class="css"></textarea>');
               element.append(text_area_css);
            }
            else {
                text_area_css.attr('id', 'tornado-textarea-css-' + App.index);
            }



            element_topush.target = element;
            element_topush.cm_javascript = CodeMirror.fromTextArea(text_area_js[0], {
                lineNumbers: true,
                lineWrapping: true,
                smartIndent:true,
                mode: "javascript"
            });
            element_topush.cm_html = CodeMirror.fromTextArea(text_area_html[0], {
                lineNumbers: true,
                lineWrapping: true,
                smartIndent: true,
                mode: "htmlmixed"
            });
            element_topush.cm_css = CodeMirror.fromTextArea(text_area_css[0], {
                lineNumbers: true,
                lineWrapping: true,
                smartIndent: true,
                mode:"css"
            });
            element_topush.cm_resources = CodeMirror.fromTextArea(text_area_resources[0], {
                lineNumbers: true,
                lineWrapping: true,
                smartIndent: true,
                mode: "htmlmixed"
            });

            element_topush.code_HTML = function () {
                return this.cm_html.getValue();
            }


         
            element_topush.code_JS = function () { return "<script>" + this.cm_javascript.getValue() + "</script>"; }
            element_topush.code_CSS = function () { return "<style>" + this.cm_css.getValue() + "</style>";}
            element_topush.code_RES = function () { return this.cm_resources.getValue(); }
            element_topush.code_RES_JQUERY = function () { return "<div>" + this.cm_resources.getValue() + "</div>"; }

            element_topush.edit = function () {

                var me = this;
                var $iframe = $('#' + this.iframe);
                $iframe.hide();
                $(me.cm_html.getWrapperElement()).hide();
                $(me.cm_css.getWrapperElement()).hide();
                $(me.cm_javascript.getWrapperElement()).hide();
                $(me.cm_resources.getWrapperElement()).hide();
                var editor_mode = me.toolbar.find(".tornado-tab-active").data('type');
               
                switch (editor_mode) {
                    case "javascript":
                        $(me.cm_javascript.getWrapperElement()).show();
                        break;
                    case "css":
                        $(me.cm_css.getWrapperElement()).show();
                        break;
                    case "html":
                        $(me.cm_html.getWrapperElement()).show();
                        break;

                    case "resources":
                        $(me.cm_resources.getWrapperElement()).show();
                        break;

                }
                me.target.find(".tornado-tab").show();
            }
           
            element_topush.run = function () {
                var me = this;
                $(me.cm_html.getWrapperElement()).hide();
                $(me.cm_css.getWrapperElement()).hide();
                $(me.cm_javascript.getWrapperElement()).hide();
                $(me.cm_resources.getWrapperElement()).hide();
                me.target.find(".tornado-tab").hide();
                me.setiframe();
               
            }

            element_topush.codepen = function () {

                this.target.find(".form-codepen").remove();

                var form_pen = $('<form class="codepen" action="http://codepen.io/pen/define" method="POST" target="check"><input type="hidden" name="title" value="Tornado to JSFiddle" /></form>');

                var hidden_data = $('<input type="hidden" name="data" />');
              
                var $resources = $(this.code_RES_JQUERY());
                var css_external = [];
                var js_external = [];
                $resources.find("script").each(function () {
                    js_external.push($(this).attr('src'));
                });
                $resources.find("link").each(function () {
                    css_external.push($(this).attr('href'));
                });

                var code_pen_object = {
                    "title": "Tornado to CodePen",
                    "html": this.code_HTML(),
                    "css": this.cm_css.getValue(),
                    "js": this.cm_javascript.getValue(),
                    "css_external": css_external.join(";"),
                    "js_external": js_external.join(";")
                }

               

             
                hidden_data.val(JSON.stringify(code_pen_object));
                form_pen.append(hidden_data);
                this.target.append(form_pen);
                form_pen.submit();

            }
            element_topush.jsfiddle = function () {

                this.target.find(".form-fiddle").remove();

                var form_fiddler = $('<form class="form-fiddle" action="http://jsfiddle.net/api/post/library/pure/" method="POST" target="check"><input type="hidden" name="title" value="Tornado to JSFiddle" /></form>');

                var hidden_html = $('<input type="hidden" name="html" />');
                var hidden_js = $('<input type="hidden" name="js" />');
                var hidden_css = $('<input type="hidden" name="css" />');
                var hidden_resources = $('<input type="hidden" name="resources" />');



                var resources_list = [];

                var $resources = $(this.code_RES_JQUERY());
                $resources.find("script").each(function () {
                    resources_list.push($(this).attr('src'));
                });
                $resources.find("link").each(function () {
                    resources_list.push($(this).attr('href'));
                });
             
                hidden_css.val(this.cm_css.getValue());
                hidden_js.val(this.cm_javascript.getValue());
                hidden_html.val(this.code_HTML());
                hidden_resources.val(resources_list.join(","));
                form_fiddler.append(hidden_css);
                form_fiddler.append(hidden_js);
                form_fiddler.append(hidden_html);
                form_fiddler.append(hidden_resources);
                this.target.append(form_fiddler);
                form_fiddler.submit();

            }

            element_topush.gethtmlcontent = function () {

                var content = "<html>";
                content += "<head>";
                content += this.code_RES();
                content += this.code_CSS();
                content += "</head>";
                content += "<body>";
                content += this.code_HTML();
                content += this.code_JS();
                content += "</body>";
                content += "</html>";

                return content;
            }

            element_topush.setiframe = function () {
                var me = this;
                me.target.find('iframe').remove();
                me.target.append('<iframe class="tornado-iframe" id="' + me.iframe + '"/>');
                var content = me.gethtmlcontent();
                setTimeout(function () {
                    var iframe =  me.target.find('iframe')[0];
                    var doc =iframe.document;

                    if(iframe.contentDocument)
                        doc = iframe.contentDocument; // For NS6
                    else if(iframe.contentWindow)
                        doc = iframe.contentWindow.document; 


                    doc.open();
                    doc.writeln(content);
                    doc.close();
                   // $('#'+me.iframe).height(doc['body'].offsetHeight*1.2);
                   
                    
               
                },0);
            }
           // element_topush.setiframe();
            App.tornados[element.attr("id")] = element_topush;
            App.index++;
        },



        init: function (settings) {

            $(document).on('click', '.tornado-toggle', function () {
                if ($(this).hasClass("tornado-edit")) {
                    $(this).removeClass("tornado-edit")
                    $(this).addClass("tornado-run")
                    $(this).attr('value', "show result");
                    App.tornados[$(this).data('id')].edit();
                } else {

                    $(this).addClass("tornado-edit")
                    $(this).removeClass("tornado-run")
                    $(this).attr('value', "edit this code");
                    App.tornados[$(this).data('id')].run();
                }


                return false;
            });

            $(document).on('click', '.tornado-jsfiddle', function () {
                    App.tornados[$(this).data('id')].jsfiddle();
                return false;
            });


            $(document).on('click', '.tornado-save-html', function () {
                $(this).attr('href', "data:application/octet-stream;base64," + btoa(App.tornados[$(this).data('id')].gethtmlcontent()));
              
            });


            $(document).on('click', '.tornado-codepen', function () {

                App.tornados[$(this).data('id')].codepen();


                return false;
            });


            $(document).on('click', '.tornado-tab-selection', function () {

                $(this).parent().find('.tornado-tab-selection').removeClass('tornado-tab-active');
                $(this).addClass('tornado-tab-active');
                App.tornados[$(this).parent().data('id')].edit();

                return false;
            });


            $(".tornado").each(function () {
                App.addtornado($(this));

                
            });

            for (var i in App.tornados  ) {
                App.tornados[i].run();
            }
        }



       
    }



    return App;

})(document, window, jQuery);

$(function () {
    tornado.init();

    $(".view-option").click(function () {
 
        if ($(".tornado-container-mode").hasClass("tornado-tab-visible")) {
            $(".tornado-container-mode").removeClass("tornado-tab-visible");
            $(this).removeClass("view-option-active")
        }
        else {
            $(".tornado-container-mode").addClass("tornado-tab-visible");
            $(this).addClass("view-option-active")
        }
    });
    $(".tornado-container-mode a").click(function () {

        if ($(".tornado-container-mode").hasClass("tornado-tab-visible")) {
            $(".tornado-container-mode").removeClass("tornado-tab-visible");
            $(".view-option").removeClass("view-option-active");
        }
        else {
            $(".tornado-container-mode").addClass("tornado-tab-visible");
            $(".view-option").addClass("view-option-active");
        }
    });
}
   
);

