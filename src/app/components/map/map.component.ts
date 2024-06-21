import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ToastService } from '../../shared/services/toast/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit{

  constructor(
    private dialog: MatDialog,
    private toastr: ToastService,
    private route: ActivatedRoute,
    private accountService: AccountService
  ){}
  
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  center: google.maps.LatLngLiteral = { lat: 49.834338, lng: 23.984174 };
  zoom = 12;
  display?: google.maps.LatLngLiteral;
  coordinates!: any;
  lat!: any;
  lng!: any;
  searchMarker: google.maps.Marker | undefined;
  map!: google.maps.Map;
  geocoder!: google.maps.Geocoder;
  isError: boolean = true
//.AdvancedMarkerElement


  yellowZones: google.maps.Polygon[] = [];
  yellowZone1: google.maps.Polygon | undefined;
  yellowZone2: google.maps.Polygon | undefined;
  yellowZone3: google.maps.Polygon | undefined;
  yellowZone4: google.maps.Polygon | undefined;
  greenZone: google.maps.Polygon | undefined;

  searchAddress: string = '';

  // geocoder = new google.maps.Geocoder();

  //   loading = false;
  //   mapCenter!: google.maps.LatLng;
  //   markerInfoContent = '';
  //   markerOptions: google.maps.MarkerOptions = {
  //   draggable: false,
  //   animation: google.maps.Animation.DROP,
  // };
  isCheckout: boolean = false;

      greenZoneCoords: google.maps.LatLngLiteral[] = [
        { lat: 49.854224088692504, lng: 23.9789482531578 },
        { lat: 49.854224088692504, lng: 24.029914055569886 },
        { lat: 49.85103841572733, lng: 24.0295861187521 },
        { lat: 49.85103841572733, lng: 24.019913760324712 },
        { lat: 49.843291657974994, lng: 24.0220411481525 },
        { lat: 49.84509389071649, lng: 24.035971472795218 },
        { lat: 49.836753731609676, lng: 24.052497260727833 },
        { lat: 49.82941019981968, lng: 24.058985349127074 },
        { lat: 49.81695115137438, lng: 24.068340894077217 },
        { lat: 49.821990530726275, lng: 24.071602460206623 },
        { lat: 49.82320876343619, lng: 24.074778195648413 },
        { lat: 49.82453770958888, lng: 24.073576566021792 },
        { lat: 49.82542365340939, lng: 24.07108747608093 },
        { lat: 49.83151407796658, lng: 24.065594312073507 },
        { lat: 49.83129262141863, lng: 24.07486402633603 },
        { lat: 49.82835822642763, lng: 24.07323324327133 },
        { lat: 49.82598398646179, lng: 24.08254514798492 },        
        { lat: 49.82398398646179, lng: 24.09254514798492 },
        { lat: 49.807513877243515, lng: 24.078165286341665 },
        { lat: 49.8061844634954, lng: 24.079195254593053 },
        { lat: 49.79510459572576, lng: 24.091554873609756 },
        { lat: 49.78878793655475, lng: 24.096533053491477 },
        { lat: 49.78346800562824, lng: 24.079538577343516 },
        { lat: 49.78125119531083, lng: 24.05224441868164 },
        { lat: 49.78925535872798, lng: 24.031455281715907 },
        { lat: 49.787205057662284, lng: 24.02312970501716 },
        { lat: 49.82711640452001, lng: 23.982762346020333 },
        { lat: 49.81351706380154, lng: 23.95977736691808 },
        { lat: 49.796140494499525, lng: 24.016497100539397 },
        { lat: 49.79575266149884, lng: 24.010488952406277 },
        { lat: 49.795974280736715, lng: 24.004566634960774 },
        { lat: 49.796472920313605, lng: 23.989031280502285 },      
        { lat: 49.80184682098267, lng: 23.980448211740686 },
        { lat: 49.842630380974825, lng: 23.956642129822463 },
        { lat: 49.8502884551792, lng: 23.957223815562152 },
        { lat: 49.854224088692504, lng: 23.9789482531578 },
      ];



      yellowZoneCoords: google.maps.LatLngLiteral[] = [        
        { lat: 49.832424915052776, lng: 23.93761591769943 },
        { lat: 49.81344783299073, lng: 23.95979882458998 },
        { lat: 49.819755939976574, lng: 23.970014609506844 },
        { lat: 49.842630380974825, lng: 23.956642129822463 },
        { lat: 49.8502884551792, lng: 23.957223815562152 },
      ];

      yellowZoneCoords1: google.maps.LatLngLiteral[] = [
        { lat: 49.84891606730015, lng: 24.103224819163074 },
        { lat: 49.850567952406244, lng: 24.089329157059026 },
        { lat: 49.845883747737176, lng: 24.04523910712598 },
        { lat: 49.854057725559066, lng: 24.04370849844988 },
        { lat: 49.859167659056496, lng: 24.048731594536974 },
        { lat: 49.8770434812657, lng: 24.04385310077413 },
        { lat: 49.85421796974925, lng: 24.029918022102258 },
        { lat: 49.85103841572733, lng: 24.0295861187521 },
        { lat: 49.85103841572733, lng: 24.019913760324712 },
        { lat: 49.843291657974994, lng: 24.0220411481525 },
        { lat: 49.84509389071649, lng: 24.035971472795218 },
        { lat: 49.836753731609676, lng: 24.052497260727833 },
        { lat: 49.82941019981968, lng: 24.058985349127074 },
        { lat: 49.81695115137438, lng: 24.068340894077217 },
        { lat: 49.821990530726275, lng: 24.071602460206623 },
        { lat: 49.82320876343619, lng: 24.074778195648413 },
        { lat: 49.82453770958888, lng: 24.073576566021792 },
        { lat: 49.82542365340939, lng: 24.07108747608093 },
        { lat: 49.83151407796658, lng: 24.065594312073507 },
        { lat: 49.83129262141863, lng: 24.07486402633603 },
        { lat: 49.82835822642763, lng: 24.07323324327133 },
        { lat: 49.82598398646179, lng: 24.08254514798492 },
        { lat: 49.83915739800414, lng: 24.106075201852356 }
      ];

      yellowZoneCoords2: google.maps.LatLngLiteral[] = [
        { lat: 49.86767061764991, lng: 23.94373077138502 },
        { lat: 49.87280151735453, lng: 23.946563184121107 },
        { lat: 49.87379720829003, lng: 23.94952434284386 },
        { lat: 49.87260790837752, lng: 23.960596501560502 },
        { lat: 49.871294112792704, lng: 23.96480220536491 },
        { lat: 49.86189943306372, lng: 23.970729887285863 },
        { lat: 49.85804873788377, lng: 23.981786691581416 },
        { lat: 49.854224088692504, lng: 23.989892531578 },
        { lat: 49.854224088692504, lng: 23.9789482531578 },
      ];
      
      yellowZoneCoords3: google.maps.LatLngLiteral[] = [
        { lat: 49.819755939976574, lng: 23.970014609506844 },
        { lat: 49.80794918015943, lng: 23.97664394709279 },
        { lat: 49.79730840721725, lng: 24.012975129875738 },      
        { lat: 49.82711640452001, lng: 23.982762346020333 },
      ];

      yellowZoneCoords4: google.maps.LatLngLiteral[] = [
        {lat: 49.79749012241635, lng: 24.099945293224356 },
        { lat: 49.7842281691116, lng: 24.09872354609821 },
        { lat: 49.77761038943885, lng: 24.073895442804467 },      
        { lat: 49.77965887289133, lng: 24.032226368380087 },
        { lat: 49.7713143565962, lng: 24.032364874144637 }, 
        { lat: 49.77680275454933, lng: 23.98356893861552 },
        { lat: 49.79059888814219, lng: 23.998250737162397 },
        { lat: 49.79441416439667, lng: 23.972277381868082 },
        { lat: 49.80184682098267, lng: 23.980448211740686 },
        { lat: 49.796472920313605, lng: 23.989031280502285 },
        { lat: 49.79575266149884, lng: 24.010488952406277 },
        { lat: 49.796140494499525, lng: 24.014297100539397 },
        { lat: 49.787205057662284, lng: 24.02312970501716 },                        
        { lat: 49.78925535872798, lng: 24.031455281715907 },
        { lat: 49.78125119531083, lng: 24.05224441868164 },
        { lat: 49.78346800562824, lng: 24.079538577343516 },
        { lat: 49.78878793655475, lng: 24.096533053491477 },
        { lat: 49.79510459572576, lng: 24.091554873609756 },       
      ];
  
  ngOnInit(): void {
    this.initForm();    
    this.accountService.address$.subscribe((address) => {
      this.searchLocation(address);
    })
  }

  async ngAfterViewInit(): Promise<void> {
  
    if (this.mapContainer) {
      const mapOptions: google.maps.MapOptions = {
        center: this.center,
        zoom: this.zoom
      };
  
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
      this.geocoder = new google.maps.Geocoder();

      this.initializeZones();

      this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
        this.moveMap(event);
      });
  
      this.map.addListener('mousemove', (event: google.maps.MapMouseEvent) => {
        this.move(event);
      });
      
    }
  }

  initializeZones() {
    const yellowZoneOptions: google.maps.PolygonOptions = {
      strokeColor: '#FFF000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FFFF00',
      fillOpacity: 0.35,
    };

    this.yellowZones.push(new google.maps.Polygon({
      ...yellowZoneOptions,
      paths: this.yellowZoneCoords,
    }));

    this.yellowZones.push(new google.maps.Polygon({
      ...yellowZoneOptions,
      paths: this.yellowZoneCoords1,
    }));

    this.yellowZones.push(new google.maps.Polygon({
      ...yellowZoneOptions,
      paths: this.yellowZoneCoords2,
    }));

    this.yellowZones.push(new google.maps.Polygon({
      ...yellowZoneOptions,
      paths: this.yellowZoneCoords3,
    }));

    this.yellowZones.push(new google.maps.Polygon({
      ...yellowZoneOptions,
      paths: this.yellowZoneCoords4,
    }));

    this.greenZone = new google.maps.Polygon({
      paths: this.greenZoneCoords,
      strokeColor: '#00FF00',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#00FF00',
      fillOpacity: 0.35,
    });

    this.yellowZones.forEach(zone => zone.setMap(this.map));
    this.greenZone.setMap(this.map);
  }

  onMapReady(map: google.maps.Map) {
    this.map = map;
  }

  
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  initForm(): void{
    
    if ( this.route.component?.name === 'DeliveryComponent') {
      this.isCheckout = true;
    }    
  }

  searchLocation(address: string) {
    if (address) {
      const addressString = address + ', Львів';
      const geocoderRequest: google.maps.GeocoderRequest = {
        address: addressString,
        region: 'uk'
      };
  
      this.geocoder.geocode(geocoderRequest, async (results, status) => {
        if (status === 'OK' && results && results.length > 0) {

        const validResult = results.find(result => {
          return result.types.includes('street_address') || result.types.includes('premise');
        });

        if (!validResult) {
          this.showErrorDialog('Невалдна адреса. Вкажіть точну адресу з номером будинку.');
          return;
        }
          const location = results[0].geometry.location;
          const lat = location.lat();
          const lng = location.lng();
          if (this.searchMarker) {
            this.searchMarker.setMap(null);
          }
          this.searchMarker = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: this.map,
            title: 'Searched Location'
          });

          this.center = { lat: lat, lng: lng };
          this.zoom = 16;
          this.lat = lat;
          this.lng = lng;
          this.map.set('zoom', 16);
          this.map.setCenter({ lat: lat, lng: lng });
          this.checkDeliveryZone({ lat, lng });
        
        }
        else {
          this.showErrorDialog('No results found for the address.');
          this.accountService.setZoneStatus(false, false);
        }    
      });
    }
  }

  checkDeliveryZone(location: google.maps.LatLngLiteral) {
    // this.getCurrentLocation();
    const latLng = new google.maps.LatLng(location);
    const isInGreenZone = google.maps.geometry.poly.containsLocation(latLng, this.greenZone!);
    const isInYellowZone = this.yellowZones.some(zone => google.maps.geometry.poly.containsLocation(latLng, zone!));
    
    let message = "";
    if (isInGreenZone) {
      message = 'Адреса в зеленій зоні доставки';
      this.isError = false;
    } else if (isInYellowZone) {
      message = 'Адреса в жовтій зоні доставки';
      this.isError = false;
    } else {
      message = 'Адреса не в зоні доставки';
      this.isError = true;
    } 
    this.showErrorDialog(message);
    this.accountService.setZoneStatus(isInGreenZone, isInYellowZone);      
  }

  showErrorDialog(message: string) {
    this.dialog.open(AlertDialogComponent, {
    backdropClass: 'dialog-back',
    panelClass: 'alert-dialog',
    autoFocus: false,
    data: {
      message: message
    }
    });
    if( this.isError)
      this.toastr.showError('', message);
    else this.toastr.showSuccess('', message);
  }
  // getCurrentLocation() {
  //   this.loading = true;

  //   navigator.geolocation.getCurrentPosition(
  //     (position: GeolocationPosition) => {
  //       this.loading = false;

  //       const point: google.maps.LatLngLiteral = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       };

  //       this.mapCenter = new google.maps.LatLng(point);
  //       this.map.panTo(point);

  //       this.markerInfoContent = "I'm here!";

  //       this.markerOptions = {
  //         draggable: false,
  //         animation: google.maps.Animation.DROP,
  //       };
  //     },
  //     (error) => {
  //       this.loading = false;
  //       console.error('Error getting location:', error);
  //     }
  //   );
  //   }
    
  
  }
  
  /* 
  KEY_API = 'AIzaSyCiZNf5DEW6DRxd6trod-rMuH7gLuRBtIs';
  //AIzaSyCiZNf5DEW6DRxd6trod-rMuH7gLuRBtIs
*/



