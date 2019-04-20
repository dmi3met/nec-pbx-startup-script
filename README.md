# nec-pbx-startup-script
small Google Spreadsheets script to format NEC PBX settings from table into nec .pcs script

this script work with sheet named 'form' contained settings like this:

Common   |	PBX |	SV9100        | +             	| COS_restriction_V1.pcs
--- | --- | --- | --- |---
Network  |	IP  |	192.168.10.9  |	255.255.255.248 | 192.168.10.1        

and sheet named 'rules' contained format rules like this:

PBX	|Ip-address|	Item|	Net mask|	Item|	Gateway|	Item|
--- | --- | --- | --- | --- | --- | ---
SL1000*	| | | | |	|				
SL2100|	10-12	|(0,0,0)|	10-12	|(0,0,1)|	10-12	|(0,0,2)
SV9100|	10-12	|(0,0,0)|	10-12	|(0,0,1)|	10-12	|(0,0,2)

*SL1000 not implemented yet
