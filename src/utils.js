module.exports ={

    setDefault: (obj, prop, val) => {
        if( ! obj.hasOwnProperty(prop) ){
            return val
        }
        return obj[prop]
    },

    q: selector => {
        return document.querySelector(selector)
    },

    qa: selector => {
        return document.querySelectorAll(selector)
    },

    createAndAppend: (str, newParent) => {
        const div = document.createElement('div')
        div.innerHTML = str.trim()
        newParent.appendChild(div.firstChild)
    }

}
