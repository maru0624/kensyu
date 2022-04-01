//This file is automatically rebuilt by the Cesium build process.
export default "#ifdef LIGHTING_PBR\n\
vec3 computePbrLighting(czm_modelMaterial inputMaterial)\n\
{\n\
    czm_pbrParameters pbrParameters;\n\
    pbrParameters.diffuseColor = inputMaterial.diffuse;\n\
    pbrParameters.f0 = inputMaterial.specular;\n\
    pbrParameters.roughness = inputMaterial.roughness;\n\
    \n\
    vec3 lightColorHdr = czm_lightColorHdr;\n\
\n\
    vec3 color = inputMaterial.diffuse;\n\
    #ifdef HAS_NORMALS\n\
    color = czm_pbrLighting(\n\
        v_positionEC,\n\
        inputMaterial.normalEC,\n\
        czm_lightDirectionEC,\n\
        lightColorHdr,\n\
        pbrParameters\n\
    );\n\
    #endif\n\
\n\
    color *= inputMaterial.occlusion;\n\
    color += inputMaterial.emissive;\n\
\n\
    // In HDR mode, the frame buffer is in linear color space. The\n\
    // post-processing stages (see PostProcessStageCollection) will handle\n\
    // tonemapping. However, if HDR is not enabled, we must tonemap else large\n\
    // values may be clamped to 1.0\n\
    #ifndef HDR \n\
    color = czm_acesTonemapping(color);\n\
    #endif \n\
\n\
    return color;\n\
}\n\
#endif\n\
\n\
void lightingStage(inout czm_modelMaterial material)\n\
{\n\
    // Even though the lighting will only set the diffuse color,\n\
    // pass all other properties so further stages have access to them.\n\
    vec3 color = vec3(0.0);\n\
\n\
    #ifdef LIGHTING_PBR\n\
    color = computePbrLighting(material);\n\
    #else // unlit\n\
    color = material.diffuse;\n\
    #endif\n\
\n\
    // If HDR is not enabled, the frame buffer stores sRGB colors rather than\n\
    // linear colors so the linear value must be converted.\n\
    #ifndef HDR\n\
    color = czm_linearToSrgb(color);\n\
    #endif\n\
\n\
    material.diffuse = color;\n\
}\n\
";
