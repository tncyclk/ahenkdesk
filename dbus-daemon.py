import dbus
import dbus.service # dbus ve dbus servisini import ediyoruz
from dbus.mainloop.glib import DBusGMainLoop # dbus kütüphanesinin kendi içinde bulunan daemon uygulama kütüphanesini import ediyoruz
from gi.repository import GLib # dbus kütüphanesinin kendi içinde bulunan daemon uygulama kütüphanesini import ediyoruz



UID         =  'org.ahenkdesk.dbus.Daemon'
UID_AS_PATH = '/org/ahenkdesk/dbus/Daemon' # burada bus veri yolumuz için bir well known name ve bu isme uygun bir yol belirlememiz gerekiyor.
# bu isimin benzersiz olmasına dikkat edilmeli
EX_DATA = 'Ahenkten gelen mesaj' 

class MyappDaemon(dbus.service.Object): # bir class tanımlayıp bunu dbus servis objesi olarak tanımlıyoruz
# böylece mesajlarımızı taşıyan yapıya sahip olacağız
    def __init__(self, bus_name):
        super().__init__(
            bus_name, UID_AS_PATH
        )
    # ve burada dbus interface oluşturarak gelen mesajları nasıl kullanacağımızı belirtiyoruz
    @dbus.service.method(
        dbus_interface=UID,
        in_signature='s', out_signature='s' #buradaki signatureler methoda giren input ve çıkan output değerlerin türünü belirtiyor s ise string anlamına geliyor
    )
    def messageSend(self, myData: str) -> str:
        print(myData)
        return f'Hi there, {myData}!'
    # dbus servis method bitişi
    @dbus.service.method(
        dbus_interface=UID,
        out_signature='s' #buradaki signatureler methoda giren input ve çıkan output değerlerin türünü belirtiyor s ise string anlamına geliyor
    )
    def messageIncome(self):
        if EX_DATA != "":
            return EX_DATA
        else:
            return ""
    # dbus servis method bitişi

def main():
    DBusGMainLoop(set_as_default=True) #main methodumuzu bir daemona dönüştürüyoruz
    try:
        bus_name = dbus.service.BusName(
            UID, bus=dbus.SessionBus(), do_not_queue=True #dbus türünü belirtiyoruz bu systembus veya sessionbus olabilir
        )
    except dbus.exceptions.NameExistsException:
        print(f'Service with id {UID} is already running')
        exit(1)
    loop = GLib.MainLoop()
    daemon = MyappDaemon(bus_name) # burada oluşturduğumuz mesaj taşıma objesini izlemeye alıyoruz
    try:
        loop.run()
    except KeyboardInterrupt:
        print('KeyboardInterrupt received')
    except Exception as e:
        print('Unhandled exception: `{}`'.format(str(e)))
    finally:
        loop.quit()


if __name__ == '__main__':
    main()