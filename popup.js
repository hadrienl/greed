var form = document.getElementById('greed'),
    toggle = document.getElementById('toggle'),

    visible = true,

    updateEvent = function()
    {
        var code =
        "window.__greed = window.__greed || new Greed();"+
        "window.__greed.refresh({"+
            "size: "+form.size.value+","+
            "top: "+(form.top.value || 0)+","+
            "left: "+(form.left.value || 0)+","+
            "opacity: "+form.opacity.value+
        "});"

        chrome.tabs.executeScript(
            null,
            {
                code: code
            }
        );
    },

    toggleEvent = function()
    {
        toggle.getElementsByClassName(
            visible ? 'showed' : 'hidden'
        )[0].style.display = '';
        toggle.getElementsByClassName(
            visible ? 'hidden' : 'showed'
        )[0].style.display = 'none';
        
        if (visible)
        {
            chrome.tabs.executeScript(
                null,
                {
                    code: "__greed.show();"
                }
            );
        }
        else
        {
            chrome.tabs.executeScript(
                null,
                {
                    code: "__greed.hide();"
                }
            );
        }
    };

/**
 * Call updateEvent when value change for each inputs in form
 */
['size','top', 'left','opacity'].forEach(function(input)
{
    form[input].addEventListener(
        'change',
        function()
        {
             updateEvent();
        }
    );
});

/**
 * Call updateEvent when submitting form
 */
form.addEventListener(
    'submit',
    function(e)
    {
        e.preventDefault();
        
        updateEvent();
    },
    true
);

/**
 * Toggle greed
 */
toggle.addEventListener(
    'click',
    function()
    {
        visible = !visible;

        toggleEvent();
    },
    true
);

/**
 * Inject Greed script into current tab page
 */
chrome.tabs.executeScript(
    null,
    { file: 'greed.js' },
    function()
    {
        var code = "window.__greed = window.__greed || new Greed();"+
        "__greed.getSavedParams()";
        chrome.tabs.executeScript(
            null,
            {
                code: code
            },
            function(result)
            {
                savedparams = result[0];
                savedparams = savedparams || {};
                savedparams.size && (form.size.value = savedparams.size);
                savedparams.top && (form.top.value = -savedparams.top);
                savedparams.left && (form.left.value = -savedparams.left);
                savedparams.opacity && (form.opacity.value = savedparams.opacity);

                updateEvent();

                if (undefined !== savedparams.visible &&
                    this.visible !== savedparams.visible)
                {
                    this.visible = savedparams.visible;
                    toggleEvent();
                }
            }
        );
    }
);