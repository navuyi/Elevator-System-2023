/**
 * Function shuffles array by reference using Fisher-Yates algorithm
 * @param array 
*/
export const shuffle_array = (array : Array<any>) : Array<any> => {
    const arr = [...array]

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    return arr
}

export const save_json_browser = function(obj:object, filename:string) {
  try{
      const data = JSON.stringify(obj, null, 2);
      const blob = new Blob( [ data ], {
          type: 'application/json'
      });

      const url = URL.createObjectURL( blob );
      const link = document.createElement( 'a' );
      link.setAttribute( 'href', url );
      link.setAttribute( 'download', filename);
      const event = document.createEvent( 'MouseEvents' );
      event.initMouseEvent( 'click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
      link.dispatchEvent( event );

      return true
  }
  catch (err){
      console.log(err)
      return false
  }
}


