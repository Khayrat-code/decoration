$root = 'C:\Users\khayrat\Desktop\free_lancer_projects\ToolCan_decoration\الصور'
$map = [ordered]@{
  'حمامات'    = 'Bathrooms'
  'صالة طعام' = 'Dining'
  'غرف اطفال' = 'Kids'
  'غرف نوم'   = 'Bedrooms'
  'غرفة معيشة' = 'Living'
  'مطابخ'    = 'Kitchens'
  'مكاتب'    = 'Offices'
}

$total = 0
foreach ($ar in $map.Keys) {
  $path = Join-Path $root $ar
  if (-not (Test-Path -LiteralPath $path)) {
    Write-Host ("[missing] {0}" -f $ar)
    continue
  }
  $files = Get-ChildItem -LiteralPath $path -File -ErrorAction SilentlyContinue
  Write-Host ("=== {0} ({1}) ===" -f $map[$ar], $ar)
  $count = 0
  foreach ($f in $files) {
    $count++
    $total++
    Write-Host ("  {0,3}  {1,8:N2} MB  {2}" -f $count, ($f.Length/1MB), $f.Name)
  }
  Write-Host ("  total: {0} files`n" -f $count)
}
Write-Host ("Grand total: {0} files" -f $total)
