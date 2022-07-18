import Swal from 'sweetalert2'

export default {
  errorMsg (msg: string, time) {
    Swal.fire({
      icon: 'error',
      title: msg,
      timer: time
    })
  },
  successMsg (msg: string, time) {
    Swal.fire({
      icon: 'success',
      title: msg,
      timer: time
    })
  },
  successMsgWithButton (msg: string) {
    Swal.fire({
      icon: 'success',
      title: msg,
      showCloseButton: true
    })
  },
  errorMsgWithButton (msg: string) {
    Swal.fire({
      icon: 'error',
      title: msg,
      showCloseButton: true
    })
  }
}
