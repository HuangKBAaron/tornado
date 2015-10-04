$(document).ready(function () {
    $('.code').each(function () {
        CodeMirror.fromTextArea(this, {
            lineNumbers: true,
            lineWrapping: true,
            smartIndent: true,
            mode: "htmlmixed"
        });
    });
});
