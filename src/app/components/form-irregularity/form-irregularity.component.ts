import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { IrregularityService } from '../../services/irregularity.service';
import { OccurrenceService } from './../../services/occurrence.service';
import { AclService } from 'ng2-acl';
import { NotifyService } from './../../services/notify/notify.service';
import { Zone } from './../../models/zone.model';
import { ZoneService } from 'src/app/services/zone.service';
import { IrregularityType } from './irregularitytype.model';

@Component({
  selector: 'app-form-irregularity',
  templateUrl: './form-irregularity.component.html',
  styleUrls: ['./form-irregularity.component.scss']
})
export class FormIrregularityComponent implements OnInit {

  formIrregularity: FormGroup;
  loading = false;
  submitted = false;
  public zones: Zone[];
  public irregularityTypes: IrregularityType[];

  // Validator patterns
  titlePattern = '^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9,.!?*"#%(); -]{6,32}$';
  storyPattern = '^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9,.!?*"#%(); -]{12,256}$';

  lat  = -8.05225025;
  lng  = -34.9450490084884;
  locationChosen = true;
  markerIsSet = true;
  zoneOutrosId;

  // Two Way Databind - passando as cordenadas para o form.
  cord;

  onChoseLocation(event) {
    if(this.markerIsSet){
      this.lat = event.coords.lat;
      this.lng = event.coords.lng;
      this.locationChosen = true;
      this.cord = this.lat + ',' + this.lng; // convertendo para string e concatenando cordenadas do mapa
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private irregularityService: IrregularityService,
    private occurrenceService: OccurrenceService,
    private notifier: NotifyService,
    public aclService: AclService,
    public zoneService: ZoneService

  ) { }

  ngOnInit() {

    this.zoneService.listAllZonesRecife().subscribe((response: Zone[]) => {
      this.zones = response;
      for(let i = 0; i < this.zones.length; i++){
        this.BuildNameZone(this.zones[i]);
        if(this.zones[i].name == "Outros"){
          this.zoneOutrosId = this.zones[i].id;
          this.zones.splice(i, i);
          break;
        }
      }  
    });

    this.irregularityService.listAllIrregularityType().subscribe((response: IrregularityType[]) => {
      this.irregularityTypes = response;
    });

    // Definindo valor default para o mapa
    if (this.cord === undefined) {
      this.cord = '-8.05241,-34.94523';
    }

    this.formIrregularity = this.formBuilder.group({
      title: ['', [ Validators.required, Validators.pattern(this.titlePattern)]],
      story: ['', [Validators.required, Validators.pattern(this.storyPattern)]],
      coordinates: [this.cord, Validators.required],
      irregularity_type_id: ['', Validators.required],
      zone_id: ['', Validators.required],
    });
  }

  get f() { return this.formIrregularity.controls; }

  onSubmit() {
    this.submitted = true;

        // stop here if form is invalid
        if (this.formIrregularity.invalid) {
          this.notifier.show('warning', 'Erro ao tentar registrar, confira se os campos foram preenchidos corretamente.');
          return;
        }

        this.loading = true;
        this.irregularityService.registerIrregularity(this.formIrregularity.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.notifier.show('success', 'Registro de irregularidade realizado com sucesso!');
                  this.router.navigate(['home/map']);
                },
                error => {
                  this.loading = false;
                  this.notifier.show('error', 'Ocorreu um erro ao tentar registrar sua irregularidade.');
                });
  }

  public changeZone($event){
    var zoneIdSelected = $event.target.value;
    var zone:Zone = this.FindIdZone(zoneIdSelected);
    if(zone != this.zoneOutrosId){      
      this.markerIsSet = false;
      this.lat = zone.latitude;
      this.lng = zone.longitude;
      this.cord = this.lat + ',' + this.lng;
    }else{
      this.markerIsSet = true;
      this.cord = this.lat + ',' + this.lng;
    }
  }

  public FindIdZone(id){
    if(id <= 0 || this.zoneOutrosId == id || id == ""){
      return this.zoneOutrosId;
    }
    for(let i = 0; i <= this.zones.length; i++){      
      if(this.zones[i].id == id){        
        return this.zones[i];
      }                 
    } 
  }

  public BuildNameZone(zone : Zone){
    if(zone.description != "")        
          zone.nameBuild = zone.name + " - " + zone.description;        
        else
          zone.nameBuild = zone.name;
  }
}