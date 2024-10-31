export const originalHeaders = [
	"RPLS_id",
	"postal_code",
	"city",
	"street_number",
	"repetition_index",
	"street_type",
	"street_name",
	"floor",
	"priority_urban_area",
	"room_count",
	"living_area_sqm",
	"year_of_construction",
	"dpe_class_energy_consumption",
	"max_apl_rent",
	"accessibility_for_disabled",
	"contact_landlord",
	"siret_number",
	"EPCI",
	"LIBEPCI",
	"financing_consolidation",
	"lon",
	"lat",
	"qpv_24",
	"qpv_15"
]

export const accessibilityCodes = {
	0: "Logement non accessible et non adapté aux fauteuils roulants",
	11: "Abords du logement accessibles mais logement non adapté aux fauteuils roulants",
	12: "Abords du logement accessibles et logement adaptable aux fauteuils roulants",
	13: "Abords du logement accessibles et logement adapté aux fauteuils roulants",
	19: "Abords du logement accessibles aux fauteuils roulants et donnée au niveau du logement non disponible",
	99: "Aucune donnée disponible"
}

export const nbpieceCodes = {
	1: "1 pièce",
	2: "2 pièces",
	3: "3 pièces",
	4: "4 pièces",
	5: "5 pièces",
	6: "6 pièces",
	7: "7 pièces",
	8: "8 pièces",
	9: "9 pièces ou plus",
	0: "Non renseigné",
	"NC": "Non conforme"
}

export const priorityUrbanArea = {
	"1": true,
	"2": false
}