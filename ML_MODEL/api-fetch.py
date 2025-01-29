from jugaad_data.nse import NSELive

n = NSELive()
status = n.market_status()
print(status['marketState'])

print("jay shree ram")
q = n.stock_quote("IREDA")
print(q['priceInfo'])
print("jay shree ram")
tick_data = n.tick_data("IREDA")
print(tick_data['grapthData'][0:10])
print("jay shree ram")
print(q['preOpenMarket'])